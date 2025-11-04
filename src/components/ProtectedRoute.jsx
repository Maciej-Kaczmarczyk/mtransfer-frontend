import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get("/auth/verify");
        if (response.data.valid) {
          setUser(response.data.user);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Błąd weryfikacji tokena:", error);
        toast.error("Sesja wygasła, zaloguj się ponownie ❌");
        setIsAuthorized(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-white text-lg">Sprawdzanie autoryzacji...</p>
      </div>
    );
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
