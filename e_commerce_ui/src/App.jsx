import CustomerDetails from './Components/CustomerDetails';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import CustomerForm from './Components/CustomerForm';
import { Route, Routes } from 'react-router-dom'; //allows usage of routes in app
import NavigationBar from './Components/NavigationBar';
import NotFound from './Components/NotFound';
import HomePage from './Components/HomePage';
import OrderList from './Components/OrderList';
import OrderForm from './Components/OrderForm';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className='app-container'>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-customer/' element={<CustomerForm />} />
        <Route path='/edit-customer/:id' element={<CustomerForm />} />
        <Route path='/customers' element={<CustomerDetails />} />
        <Route path='/add-product' element={<ProductForm />} />
        <Route path='/edit-product/:id' element={<ProductForm />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/orders' element={<OrderList /> } />
        <Route path='/edit-order/:id' element={<OrderForm /> } />
        <Route path='/new-order' element={<OrderForm /> } />
        <Route path='*' element ={<NotFound />} />
        {/* path=URL element=Componenet */}
      </Routes>
    </div>
  )
}

export default App;