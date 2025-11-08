import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import { connectSocket } from './socket/socket';

const App = () => {
  const userloggedIn = useSelector((state) => state.auth.user);
  const userToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (userToken) {
      connectSocket(userToken)
    }

    console.log(userToken);
  }, [userloggedIn]);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userloggedIn ? <ChatPage /> : <Navigate to="/auth" replace />
          }
        />

        <Route
          path="/auth"
          element={
            userloggedIn ? <Navigate to="/" replace /> : <AuthPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
