import React from "react";
import MTransfer_logo from "../assets/MTransfer_logo.svg";
import FileCard from "../components/FileCard";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Home = () => {
  const userEmail = useAuthStore((state) => state.email);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    logout();
    toast.success("Wylogowano pomyślnie 👋");
    navigate("/login");
  };

  return (
    <div className="p-8 flex flex-col items-center justify-start w-dvw h-dvh gap-4">
      <div className="w-full flex justify-between">
        <img src={MTransfer_logo} alt="MTransfer Logo" className="w-52 p-4" />
        <div className=" w-1/3 p-4 bg-white rounded-lg flex items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-blue-500">
              <svg className="absolute w-12 h-12 text-blue-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
            <p>Witaj {userEmail}</p>
          </div>
          <button onClick={handleLogout} className="text-xs w-1/3 font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer flex items-center justify-center gap-2 pr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Wyloguj
          </button>
        </div>
      </div>
      <div className="flex gap-4 w-full h-full">
        <div className=" w-1/3 h-fit p-4 bg-white rounded-xl flex flex-col items-center justify-start gap-4 shadow-lg">
          <button className="text-xs w-full font-semibold px-2 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer flex items-center justify-center gap-2 pr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
            Dodaj plik
          </button>
          <form className="space-y-4 w-full">
            <input type="text" placeholder="Tytuł" className="w-full p-2 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <textarea rows="5" cols="33" placeholder="Wiadomość" className="w-full h-24 p-2 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
            <div className="flex items-center ">
              <input type="checkbox" id="rememberMe" className="mr-2 bg-gray-500 flex items-center hover:bg-gray-600 hover:cursor-pointer" />
              <label htmlFor="rememberMe" className="text-sm font-semibold text-gray-500 hover:cursor-pointer">
                Dodaj hasło
              </label>
            </div>
          </form>
          <button className="w-full text-sm font-semibold px-2 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer">Wyślij</button>
        </div>
        <div className="w-2/3 h-fit p-8 bg-white rounded-xl shadow-lg grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
