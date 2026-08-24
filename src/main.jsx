import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Cart from './components/pages/Card.jsx'
import Home from './components/pages/Home.jsx'
import MainLayout from './components/common/MainLayout.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/cart'} element={<Cart/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  
)
