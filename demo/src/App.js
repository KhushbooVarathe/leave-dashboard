import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LeavePage from './components/LeavePage';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PrivateComponent from './routes/protected-routing/PrivateComponent';

function App() {
  return (
    <div className="">
<BrowserRouter>
<Routes>
<Route element={<PrivateComponent/>}>
<Route path="/dashboard" element={<Dashboard/>} />
</Route>
<Route path="/" element={<Login/>} />
<Route path="/register" element={<Register/>} />


</Routes>
</BrowserRouter>     
    </div>
  );
}

export default App;
