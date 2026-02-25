import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import Download from "./pages/DownloadFile";

function App() {
  return (
    <BrowserRouter>
      <div className="w-dvw h-full flex justify-center items-center-safe bg-blue-500 fixed inset-0 overflow-y-auto overscroll-y-contain">
        <Toaster richColors position="bottom-right" />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/f/:id" element={<Download />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
