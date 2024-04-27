import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BASE } from './contants';
import LogIn from './pages/LogIn';
import Main from './pages/Main';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={`${BASE}`} element={<LogIn />} />
        <Route exact path={`${BASE}/signUp`} element={<SignUp />} />
        <Route path={`${BASE}map`} element={<Main />} />
        {/* TODO: Not Found page if will have time */}
      </Routes>
    </Router>
  );
}

export default App;
