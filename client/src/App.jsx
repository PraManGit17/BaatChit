import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChatPage />} />
          <Route path='/auth' element={<AuthPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
