import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import { register } from "../api/auth";
import MTransfer_logo from "../assets/MTransfer_logo.svg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) {
      toast.error("Email jest wymagany");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Podaj poprawny email");
      return false;
    }

    if (password.length < 6) {
      toast.error("Hasło musi mieć co najmniej 6 znaków");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register(email, password);
      toast.success("Rejestracja udana ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Nie udało się zarejestrować ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-dvh bg-blue-500">
      {/* Responsywne logo */}
      <img src={MTransfer_logo} alt="MTransfer Logo" className="w-40 sm:w-52 p-6 mt-4" />
      
      <div className="flex items-center justify-center w-full flex-1 px-4 pb-8">
        {/* Elastyczny kontener: w-full na mobile, max-w-sm/96 na desktop */}
        <div className="w-full max-w-sm sm:w-96 min-h-[400px] h-fit p-6 sm:p-8 bg-white rounded-xl flex flex-col items-center justify-between shadow-lg py-8">
          <h2 className="text-2xl font-bold mb-6">Zarejestruj się</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Hasło"
                className="w-full p-3 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <input 
                onChange={(e) => setShowPassword(e.target.checked)} 
                type="checkbox" 
                id="showPassword" 
                className="w-4 h-4 mr-2 hover:cursor-pointer accent-blue-500" 
              />
              <label htmlFor="showPassword" className="text-sm font-semibold text-gray-500 hover:cursor-pointer select-none">
                Pokaż hasło
              </label>
            </div>

            <button type="submit" className="w-full font-semibold p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Zarejestruj się
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-8">
            Masz już konto?{" "}
            <NavLink to="/login" className="text-blue-500 font-semibold hover:text-blue-600">
              Zaloguj się
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;