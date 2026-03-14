import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, model, images } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

    const isVision = !!images && images.length > 0;
    const isLocalRequest = model?.includes('(Local)');

    console.log(`[AI Proxy] Received request. Local: ${isLocalRequest}, Vision: ${isVision}`);

    // Logic for Local Ollama
    if (isLocalRequest && !isVision) {
      try {
        console.log(`[AI Proxy] Attempting connection to local Ollama at ${ollamaUrl}...`);
        
        // Extract the actual model name (e.g., "Llama3" from "Llama3 (Local)")
        let ollamaModelName = model.split(' ')[0].toLowerCase();
        // Add :latest if no tag is provided (optional, Ollama does this anyway but being explicit is safer)
        if (!ollamaModelName.includes(':')) {
           // Mapping common names to their standard tags if needed
           if (ollamaModelName === 'mistral') ollamaModelName = 'mistral:latest';
           if (ollamaModelName === 'llama3') ollamaModelName = 'llama3:latest';
           if (ollamaModelName === 'gemma') ollamaModelName = 'gemma:latest';
        }
        
        const ollamaResponse = await fetch(`${ollamaUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ollamaModelName,
            messages: [{ role: 'user', content: prompt }],
            stream: false,
          }),
        });

        if (ollamaResponse.ok) {
          const ollamaData = await ollamaResponse.json();
          console.log(`[AI Proxy] Ollama responded successfully with model: ${ollamaModelName}`);
          return NextResponse.json({
            choices: [{
              message: {
                content: ollamaData.message?.content || "No response from local model."
              }
            }]
          });
        } else {
          console.warn(`[AI Proxy] Ollama returned status ${ollamaResponse.status}. Falling back to Groq.`);
        }
      } catch (ollamaErr) {
        console.error(`[AI Proxy] Ollama connection failed. Falling back to Groq. Error:`, (ollamaErr as any).message);
      }
    }

    // Fallback or Standard Groq Logic
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API Key not configured and Local Ollama unreachable' }, { status: 500 });
    }

    let messageContent: any = prompt;
    if (isVision) {
      messageContent = [
        { type: "text", text: prompt },
        ...images.map((img: string) => ({
          type: "image_url",
          image_url: { url: img }
        }))
      ];
    }

    const targetModel = isVision 
      ? 'meta-llama/llama-4-scout-17b-16e-instruct' 
      : (model === 'Llama3 (Local)' ? 'llama-3.3-70b-versatile' : 'llama-3.1-8b-instant');

    const useJsonMode = prompt.toLowerCase().includes('json');
    console.log(`[AI Proxy] Routing to Groq: ${targetModel}. JSON Mode: ${useJsonMode}`);
    
    const requestBody: any = {
      messages: [{ role: 'user', content: messageContent }],
      model: targetModel,
      max_tokens: 1024,
    };

    if (useJsonMode) {
      requestBody.response_format = { type: "json_object" };
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ 
        error: errorData.error?.message || `Groq API Error: ${response.status}`
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[AI Proxy Error]:', error);
    return NextResponse.json({ error: error.message || 'Failed to process AI request' }, { status: 500 });
  }
}
