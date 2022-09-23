//Necessary Imports
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

//App function
function App():JSX.Element {
  return (
    //router of the main application
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
