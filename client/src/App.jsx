import { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  console.log(user, token);
  
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {!user ? (
        <Login onLogin={(u, t) => { setUser(u); setToken(t); }} />
      ) : (
        <Chat user={user} token={token} />
      )}
    </div>
  );
}

export default App;
