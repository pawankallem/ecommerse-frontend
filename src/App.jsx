import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Home from './components/Home'
import Product from './components/Product'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Body />} >
          <Route path="" element={<Home />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
        <Route path='*' element={<Body />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
