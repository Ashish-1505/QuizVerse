
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
import OtpVerification from './components/Auth/OtpVerification';
import AlreadyVerified from './components/Extra/AlreadyVerified';
import UnauthorizedAccess from './components/Extra/UnauthorisedAccess';
import Exams from './components/Exams/Exams';
import FillDetailsPage from './components/Exams/FillDetailsPage';
import AddCollege from './components/Admin/AddCollege';
import ExamPage from './components/Exams/ExamPage';

import CollegeDashboard from './components/College/CollegeDashboard';
import CreateExam from './components/College/CreateExam';
import Active from './components/Exams/Active';
import Attempted from './components/Exams/Attempted';
function App() {
  return (
    <div>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<ProtectedRoute allowedRoles={['user']}><AllQuiz/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/quiz" element={<ProtectedRoute allowedRoles={['user']}><QuizPage/></ProtectedRoute>} />
        <Route path="/active" element={<ProtectedRoute allowedRoles={['user']}><Active/></ProtectedRoute>} />
        <Route path="/attempted" element={<ProtectedRoute allowedRoles={['user']}><Attempted/></ProtectedRoute>} />
        <Route path="/exam" element={<ProtectedRoute allowedRoles={['user']}><ExamPage/></ProtectedRoute>} />
        <Route path="/collegeTest" element={<ProtectedRoute allowedRoles={['user']}><Exams/></ProtectedRoute>} />
        <Route path="/filldetails" element={<ProtectedRoute allowedRoles={['user']}><FillDetailsPage/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard/></ProtectedRoute>} />
        <Route path="/collegeDashboard" element={<ProtectedRoute allowedRoles={['college']}><CollegeDashboard/></ProtectedRoute>} />
        <Route path="/createExam" element={<ProtectedRoute allowedRoles={['college']}><CreateExam/></ProtectedRoute>} />
        <Route path="/createtest" element={<ProtectedRoute allowedRoles={['admin']}><CreateQuiz/></ProtectedRoute>} />
        <Route path='/allquizes' element={<ProtectedRoute allowedRoles={['admin']}><AllQuizes/></ProtectedRoute>}/>
        <Route path='/addcollege' element={<ProtectedRoute allowedRoles={['admin']}><AddCollege/></ProtectedRoute>}/>
        <Route path='/verifyotp' element={<AlreadyVerified><OtpVerification/></AlreadyVerified>}/>
        <Route path='/unauthorizedaccess' element={<UnauthorizedAccess/>}/>
      </Routes>
      <Footer/>  
    </div> 
  );
}

export default App;
