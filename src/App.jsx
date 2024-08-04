import Header from './components/Header'
import './App.css'
import {Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Coinpage from './Pages/Coinpage'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Saved from './Pages/Saved'
function App() {

  return (
    <>
    
    
    
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path="/coin/:id" element={<Coinpage/>} />
        <Route path='/home' element={<Homepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/saved" element={<Saved/>} />
      </Routes>
      
    
   </>
  )
}

export default App
