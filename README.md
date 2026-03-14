# AcademicIntel AI

## Overview

AcademicIntel AI is a comprehensive smart classroom intelligence platform designed to enhance educational environments through AI-driven analytics and real-time monitoring. The platform empowers educators and students with insights into classroom dynamics, student well-being, and academic performance, fostering a supportive and efficient learning atmosphere.

## Features

- **Classroom Mood Detection**: Real-time analysis of student engagement and lecture pacing to optimize teaching effectiveness.
- **Student Stress Analytics**: AI-powered detection of academic burnout and stress levels to support mental health initiatives.
- **Smart Attendance**: Secure face-recognition based attendance system with IP verification for accurate tracking.
- **Anonymous Doubt Exchange**: A collaborative platform for students to share and resolve academic questions without fear of judgment.
- **Assignment Workload Analyzer**: Intelligent tracking and analysis of academic workload and deadlines to prevent overload.
- **CCTV Monitoring**: Integrated surveillance for classroom security and behavior monitoring.
- **Face Scanning**: Advanced facial recognition for attendance and identity verification.
- **Dashboard Analytics**: Comprehensive dashboards for teachers and students with data visualization and insights.

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Charts**: Chart.js, Recharts
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd academicintel-ai
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Access the landing page to explore platform features.
- Navigate to `/login` to authenticate users.
- Teachers can access `/dashboard/teacher` for analytics and insights.
- Students can access `/dashboard/student` for attendance, doubts, and wellness tracking.
- Use the API endpoint at `/api/ai-proxy` for AI-related integrations.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── ai-proxy/
│   │       └── route.ts
│   ├── dashboard/
│   │   ├── student/
│   │   │   ├── attendance/
│   │   │   ├── doubts/
│   │   │   └── wellness/
│   │   └── teacher/
│   │       ├── analytics/
│   │       └── doubts/
│   ├── login/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── CCTVMonitor.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── FaceScanner.tsx
│   └── ui/
│       └── GlassCard.tsx
└── utils/
    └── filter.ts
```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint for code quality checks

## Contributing

Contributions are welcome. Please follow the standard Git workflow:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary.
