import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FirstPage from '../../pages/firsPage/FirstPage';
import Login from '../../pages/login/login';

import NotesPage from '../../pages/notesPage';

import './App.scss';

function App() { 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/login' element={<Login login={true}/>}/>
        <Route path='/singup' element={<Login login={false}/>}/>
        <Route path='/notes' element={<NotesPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
