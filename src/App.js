import { LogIn } from './pages/Login/Login';
import { CreateOrder } from './pages/CreateOrder';
import { ProductsPage } from './pages/Products/Products';
import { Home } from './pages/Home/Home';
const { BrowserRouter, Routes, Route } = require('react-router-dom')

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<LogIn />} />
        <Route path = '/login' element = {<LogIn />} />
        <Route path = '/order/create' element = {<CreateOrder />}/>
        <Route path = '/products' element = {<ProductsPage />}/>
        <Route path = '/home' element = {<Home />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
