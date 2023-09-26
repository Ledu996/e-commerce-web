import { LogIn } from './pages/Login';
import { Home } from './pages/Home';
import { CreateOrder } from './pages/CreateOrder';

const { BrowserRouter, Routes, Route } = require('react-router-dom')

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/login' element = {<LogIn />} />
        <Route path = '/order/create' element = {<CreateOrder />}/>
        <Route path = '/home' element = {<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
