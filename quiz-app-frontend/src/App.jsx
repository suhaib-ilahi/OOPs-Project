import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './contexts/QuizContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import Home from './pages/Home.jsx';
import CreateQuiz from './pages/CreateQuiz.jsx';
import TakeQuiz from './pages/TakeQuiz.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <UserProvider>
        <QuizProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/quiz/:title" element={<TakeQuiz />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </QuizProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
