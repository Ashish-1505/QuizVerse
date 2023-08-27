
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AllQuiz from './components/Quiz/AllQuiz';
import Footer from './components/Footer/Footer';
import ShowInstuctions from './components/Quiz/ShowInstuctions';
import QuizPage from './components/Pages/QuizPage';
import ProtectedRoute from './components/Extra/ProtectedRoute'
import Dashboard from './components/Admin/Dashboard';
import CreateQuiz from './components/Admin/CreateQuiz';
import AllQuizes from './components/Admin/AllQuizes';
import { useEffect } from 'react';
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProtectedRoute><AllQuiz/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizPage/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/createtest" element={<ProtectedRoute><CreateQuiz/></ProtectedRoute>} />
        <Route path='/allquizes' element={<ProtectedRoute><AllQuizes/></ProtectedRoute>}/>
      </Routes>
      <Footer/> 
    </div> 
  );
}

export default App;
