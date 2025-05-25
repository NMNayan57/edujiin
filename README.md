# Edujiin - International Student AI Platform

![Edujiin Logo](logo.png)

## Overview

Edujiin is a premium, responsive, and visually stunning web application designed to support international students across their entire educational journey. The platform provides AI-driven guidance for pre-application, application preparation, pre-departure, during-study, and post-graduation phases.

## Features

- **User Profile Management**: Secure registration/login, detailed profile creation, document management
- **University and Program Matching**: AI-powered university recommendations based on student profiles
- **Scholarship and Funding Opportunities**: Personalized scholarship matching and application guidance
- **Application Deadline Tracking**: Timeline management and notifications for important deadlines
- **Document Creation and Enhancement**: AI-assisted document improvement for applications
- **Visa and Immigration Support**: Country-specific visa guidance and interview preparation
- **Cultural Adaptation and Language Support**: Cultural intelligence and language resources
- **Career Development and Post-Graduation Support**: Job matching and career planning
- **Conversational AI Support**: 24/7 assistance via an intelligent chatbot

## Technology Stack

### Frontend
- React/Next.js
- TypeScript
- Tailwind CSS
- Responsive design for all devices

### Backend
- Node.js with Express
- TypeScript
- RESTful API architecture

### Databases
- MongoDB for flexible data (user profiles, documents)
- PostgreSQL for relational data (universities, programs)
- Redis for caching and performance

### AI Integration
- DeepSeek AI via OpenRouter for intelligent features
- Fallback mechanisms for non-AI operation

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB
- PostgreSQL
- Redis

### Installation

1. Clone the repository or extract the zip file
```bash
git clone https://github.com/yourusername/edujiin.git
cd edujiin
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd ../frontend/my-app
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory based on the provided `.env.example`
   - Ensure the DeepSeek API key is correctly configured

5. Generate mock data
```bash
cd ../../scripts
npx ts-node generate-mock-data.ts
```

6. Start the backend server
```bash
cd ../backend
npm run dev
```

7. Start the frontend development server
```bash
cd ../frontend/my-app
npm run dev
```

8. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
edujiin/
├── frontend/               # Frontend React application
│   ├── public/             # Public assets
│   └── src/                # Source code
│       ├── components/     # Reusable UI components
│       ├── pages/          # Application pages
│       ├── styles/         # CSS and styling
│       ├── utils/          # Utility functions
│       ├── hooks/          # Custom React hooks
│       ├── context/        # React context providers
│       └── api/            # API integration
├── backend/                # Backend Node.js application
│   ├── src/                # Source code
│   │   ├── config/         # Configuration files
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── .env                # Environment variables
├── database/               # Database scripts and seeds
│   ├── mongodb/            # MongoDB schemas and migrations
│   ├── postgresql/         # PostgreSQL schemas and migrations
│   ├── redis/              # Redis configuration
│   ├── migrations/         # Database migrations
│   └── seeds/              # Seed data for testing
├── ai/                     # AI integration
│   └── deepseek/           # DeepSeek AI implementation
├── scripts/                # Utility scripts
│   ├── setup/              # Setup scripts
│   ├── deployment/         # Deployment scripts
│   └── testing/            # Testing scripts
└── docs/                   # Documentation
    ├── api/                # API documentation
    ├── setup/              # Setup guides
    └── deployment/         # Deployment guides
```

## Important Note About This Package

This zip file does not include node_modules directories to keep the file size manageable. You must run `npm install` in both the backend and frontend/my-app directories before running the application.

## Scalability and Performance

Edujiin is designed to handle at least 2,000 concurrent users with:
- Optimized database queries
- Redis caching for frequently accessed data
- Efficient API design
- Responsive frontend with optimized assets

## Security and Compliance

- GDPR and CCPA compliant
- Secure authentication with JWT
- Data encryption
- Input validation and sanitization
- Protection against common web vulnerabilities

## Mock Data

The application includes comprehensive mock data for testing:
- 2,000 user profiles
- 1,000 universities
- 500 scholarships
- 50 visa entries
- 50 cultural records
- 500 job opportunities

## Production Deployment

For production deployment:
1. Build the frontend
```bash
cd frontend/my-app
npm run build
```

2. Set up production environment variables
3. Deploy using Docker (recommended) or your preferred hosting service
4. Configure a production-ready database
5. Set up monitoring and logging

## License

[MIT License](LICENSE)

## Contact

For support or inquiries, please contact support@edujiin.com
