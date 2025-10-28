import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import { login } from "../api/auth";
import MTransfer_logo from "../assets/MTransfer_logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      toast.success("Zalogowano pomyślnie ✅");
      navigate("/home");
    } catch (err) {
      toast.error(err.message || "Nieprawidłowy e-mail lub hasło ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-dvw h-dvh">
      <img src={MTransfer_logo} alt="MTransfer Logo" className="w-52 p-4" />
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-96 h-96 p-4 bg-white rounded-xl flex flex-col items-center justify-between shadow-lg">
          <h2 className="text-2xl font-bold">Zaloguj się</h2>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <input type="email" placeholder="Email" className="w-full p-2 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Hasło"
              className="w-full p-2 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center">
              <input onChange={(e) => setShowPassword(e.target.checked)} type="checkbox" id="showPassword" className="mr-2 hover:cursor-pointer" />
              <label htmlFor="showPassword" className="text-sm font-semibold text-gray-500 hover:cursor-pointer">
                Pokaż hasło
              </label>
            </div>

            <button type="submit" className="w-full font-semibold p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer">
              Zaloguj się
            </button>
          </form>

          <p className="text-sm text-gray-500">
            Nie masz konta?{" "}
            <NavLink to="/register" className="text-blue-500 font-semibold hover:text-blue-600">
              Zarejestruj się
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
