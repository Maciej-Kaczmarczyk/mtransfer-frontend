import React from "react";
import MTransfer_logo from "../assets/MTransfer_logo.svg";
import FileCard from "../components/FileCard";

const Home = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-start w-dvw h-dvh gap-4">
      <div className="w-full flex justify-between">
        <img src={MTransfer_logo} alt="MTransfer Logo" className="w-52 p-4" />
        <div className=" w-1/3 p-4 bg-white rounded-lg flex flex-col items-center justify-start gap-4 shadow-lg"></div>
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
        <div className=" w-2/3 h-96 p-4 bg-white rounded-xl flex flex-wrap justify-between shadow-lg">
          <FileCard />
          <FileCard />
          <FileCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
