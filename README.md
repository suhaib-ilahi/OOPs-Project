
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

## 🐳 Docker Deployment

### Using Docker Compose
```bash
docker-compose up --build
```

### Individual Docker Containers
```bash
# Backend
cd quiz-app-backend
docker build -t quiz-backend .
docker run -p 9000:9000 quiz-backend

# Frontend
cd quiz-app-frontend
docker build -t quiz-frontend .
docker run -p 3000:80 quiz-frontend
```

## 🚀 Deployment

### Render.com

1. **Backend Deployment:**
   - Connect your GitHub repository
   - Select "Web Service"
   - Build Command: `cd quiz-app-backend && npm install`
   - Start Command: `cd quiz-app-backend && npm start`
   - Environment Variables: `NODE_ENV=production`

2. **Frontend Deployment:**
   - Select "Static Site"
   - Build Command: `cd quiz-app-frontend && npm install && npm run build`
   - Publish Directory: `quiz-app-frontend/dist`
   - Environment Variables: `VITE_API_URL=https://your-backend-url.onrender.com/api`

### Vercel

1. **Frontend:**
   ```bash
   cd quiz-app-frontend
   npx vercel --prod
   ```

2. **Backend:**
   ```bash
   cd quiz-app-backend
   npx vercel --prod
   ```

### Railway

1. Connect your GitHub repository
2. Select the backend folder for the backend service
3. Select the frontend folder for the frontend service
4. Set environment variables accordingly

## 📚 API Endpoints

### Quiz Endpoints
- `POST /api/quizzes/create` - Create a new quiz
- `POST /api/quizzes/add-question` - Add question to quiz
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:title` - Get quiz by title

### User Endpoints
- `POST /api/users/register` - Register new user
- `GET /api/users` - Get all users
- `POST /api/users/attempt` - Submit quiz attempt

### Health Check
- `GET /health` - Server health status

## 🎯 Usage

1. **Create Account**: Register with your name and email
2. **Create Quiz**: Build custom quizzes with multiple questions
3. **Take Quiz**: Answer questions and get instant feedback
4. **View Results**: See your score and performance

## 🧪 Testing

```bash
# Test backend API
curl http://localhost:9000/health

# Test quiz creation
curl -X POST http://localhost:9000/api/quizzes/create \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Quiz", "creator": "John Doe"}'
```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=9000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:9000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and modern web technologies.**
