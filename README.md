# AgroOx AI - Smart Cattle Farming Platform

AI-powered cattle farming platform helping farmers with breed detection, nutrition planning, health monitoring, and business insights.

## Features

- **Breed Detection**: Upload cattle photos to identify breed and get detailed information
- **Weight & Age Estimation**: AI-powered analysis to estimate cattle weight and age
- **Disease Detection**: Early detection of common cattle diseases
- **Nutrition Planner**: Personalized feed recommendations based on breed, age, and weight
- **Business Advisor**: AI-powered guidance for farm setup, financial planning, and market strategies
- **Farmer Dashboard**: Track cattle health, growth, and farm expenses with visual insights
- **Bilingual Support**: Full English and Bangla language support

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd agro-ox-insight
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router
- **State Management**: React Query
- **Backend**: Supabase (Auth + Database)
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── contexts/       # React contexts (Language, etc.)
├── hooks/          # Custom React hooks
├── integrations/   # Third-party integrations
└── lib/            # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.
