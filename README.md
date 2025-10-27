
# Quiz App - Full Stack Application

A modern, interactive quiz application built with React frontend and Node.js backend using Object-Oriented Programming principles.

## 🚀 Features

- **Create Quizzes**: Build custom quizzes with multiple-choice questions
- **Take Quizzes**: Interactive quiz-taking experience with progress tracking
- **User Management**: User registration and authentication
- **Real-time Scoring**: Instant score calculation and results display
- **Responsive Design**: Modern UI with TailwindCSS
- **Production Ready**: Docker support and deployment configurations

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Models**: Quiz, Question, User classes with OOP principles
- **Controllers**: QuizController and UserController for business logic
- **Services**: QuizService for complex operations
- **Routes**: RESTful API endpoints
- **Database**: In-memory storage (easily replaceable with MongoDB)

### Frontend (React + Vite)
- **Context API**: State management with QuizContext and UserContext
- **React Router**: Client-side routing
- **TailwindCSS**: Modern, responsive styling
- **Axios**: HTTP client for API communication

## 📁 Project Structure

```
quiz-app/
├── quiz-app-backend/          # Node.js backend
│   ├── src/
│   │   ├── controllers/       # Business logic controllers
│   │   ├── models/           # Data models (Quiz, Question, User)
│   │   ├── services/         # Service layer
│   │   ├── routes/           # API routes
│   │   ├── database/         # Database configuration
│   │   └── server.js         # Express server
│   ├── package.json
│   └── Dockerfile
├── quiz-app-frontend/         # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React Context providers
│   │   ├── services/        # API service layer
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml        # Docker orchestration
├── render.yaml              # Render deployment config
└── package.json             # Root package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```
   This will start both frontend (http://localhost:5173) and backend (http://localhost:9000) simultaneously.

### Individual Services

**Backend only:**
```bash
cd quiz-app-backend
npm install
npm run dev
```

**Frontend only:**
```bash
cd quiz-app-frontend
npm install
npm run dev
```

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and modern web technologies.**
