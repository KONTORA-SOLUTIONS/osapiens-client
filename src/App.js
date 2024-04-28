import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BASE } from './contants';
import LogIn from './pages/LogIn';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Slavik from "./pages/Slavik"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={`${BASE}`} element={<LogIn />} />
        <Route exact path={`${BASE}/signUp`} element={<SignUp />} />
        <Route path={`${BASE}map`} element={<Main />} />
        <Route path={`${BASE}/slavik`} element={<Slavik />} />
        {/* TODO: Not Found page if will have time */}
      </Routes>
    </Router>
  );
}

export default App;
