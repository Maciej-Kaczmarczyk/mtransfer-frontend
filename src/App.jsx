// ...existing code...
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="w-dvw h-dvh flex justify-center items-center-safe bg-blue-500">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;