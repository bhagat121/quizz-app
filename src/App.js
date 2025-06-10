import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import  Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Question from './components/Questions/Questions';
import SignUp from './components/SignUp/SignUp';
import Exams from './components/Admin/Exams';
import AddEditExams from './components/Admin/AddEditExams';
import Spinner from './components/Spinner/Spinner';
import { useSelector } from 'react-redux';
import WriteExam from './components/User/WriteExam';
import UserReports from './components/User/UserReports';
import AdminReports from './components/Admin/AdminReports';
import PdfDownloader from './components/User/PdfDownloader';
// import Login from './components/Login/Login';

function App() {

  const {loading} = useSelector(state => state.spinner);

  return (
    <div>
     <>
     {loading && <Spinner />}
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/question' element={<Question />}></Route>
          <Route path='/dashboard' element={<ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>}>
          </Route>
          <Route path='/admin/exams' element={<ProtectedRoutes>
            <Exams />
          </ProtectedRoutes>}></Route>
          <Route path='/admin/exams/add' element={<ProtectedRoutes>
            <AddEditExams />
          </ProtectedRoutes>}></Route>
          <Route path='/admin/exams/edit/:id' element={<ProtectedRoutes>
            <AddEditExams />
          </ProtectedRoutes>}></Route>
          <Route path='/user/write/exam/:id' element={<ProtectedRoutes>
            <WriteExam />
          </ProtectedRoutes>}></Route>
          <Route path='/user/reports' element={<ProtectedRoutes>
            <UserReports />
          </ProtectedRoutes>}></Route>
          <Route path='/admin/reports' element={<ProtectedRoutes>
            <AdminReports />
          </ProtectedRoutes>}></Route>
          <Route path='/user/report/pdf' element={<ProtectedRoutes>
            <PdfDownloader />
          </ProtectedRoutes>}></Route>
        </Routes>
      </BrowserRouter></>
    </div>
  );
}

export default App;
