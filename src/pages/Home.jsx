import { useState, useCallback, useEffect } from "react";
import MTransfer_logo from "../assets/MTransfer_logo.svg";
import FileCard from "../components/FileCard";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { uploadFile } from "../api/files";
import { getUserFiles } from "../api/files";

const Home = () => {
  const user = useAuthStore((state) => state.email);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [userFiles, setUserFiles] = useState([]);

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [addPassword, setAddPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // wyloguj użytkownika
  const handleLogout = () => {
    Cookies.remove("token");
    logout();
    toast.success("Wylogowano pomyślnie 👋");
    navigate("/login");
  };

  // obsługa wysyłania pliku
  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Nie wybrano plików!");
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    formData.append("title", title);
    formData.append("message", message);
    if (addPassword && password) formData.append("password", password);

    try {
      setIsUploading(true);
      const res = await uploadFile(formData);
      toast.success("Plik przesłany pomyślnie ✅");
      await fetchFiles();
      console.log("Odpowiedź serwera:", res);
      setFiles([]);
      setTitle("");
      setMessage("");
      setPassword("");
      setAddPassword(false);
    } catch (err) {
      console.error(err);
      toast.error("Błąd podczas przesyłania pliku ❌");
    } finally {
      setIsUploading(false);
    }
  };

  // obsługa wyboru pliku
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  // obsługa przeciągania i upuszczania pliku
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  }, []);

  // pobierz pliki użytkownika
  const fetchFiles = async () => {
    try {
      const files = await getUserFiles();
      setUserFiles(files);
    } catch (err) {
      console.error("Błąd pobierania plików:", err);
      toast.error("Nie udało się pobrać plików ❌");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-8 flex flex-col items-center justify-start w-dvw h-dvh gap-4">
      {/* Pasek górny */}
      <div className="w-full flex justify-between">
        <div className="w-full p-4 bg-white rounded-xl flex items-center justify-between gap-4 shadow-lg">
          <img src={MTransfer_logo} alt="MTransfer Logo" className="w-52 px-4" />
          <div className="flex w-1/3 justify-end gap-8">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-blue-500">
                <svg className="absolute w-12 h-12 text-blue-400 -left-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p>Witaj {user}</p>
            </div>
            <button onClick={handleLogout} className="text-xs w-1/3 font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer flex items-center justify-center gap-2 pr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              Wyloguj
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full h-full">
        {/* Lewy panel */}
        <div className="w-1/3 h-fit p-4 bg-white rounded-xl flex flex-col items-center justify-start gap-4 shadow-lg">
          {files.length > 0 && (
            <div className="flex flex-col w-full gap-2">
              {files.map((f, i) => (
                <div key={i} className="relative group flex items-center justify-between w-full rounded-lg p-1 px-2 bg-orange-100 border-2 border-orange-300 transition-transform duration-200 hover:scale-[1.01]">
                  <p className="text-sm text-gray-700 truncate max-w-[80%]">{f.name}</p>
                  <button type="button" onClick={() => setFiles((prev) => prev.filter((_, index) => index !== i))} className="text-gray-700 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* okienko z informacjami */}
                  <div className="absolute hidden group-hover:flex flex-col text-xs left-0 bottom-full mb-1 bg-gray-800 text-white p-2 rounded-md shadow-lg w-max z-10">
                    <p className="font-semibold">{f.name}</p>
                    <p>{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formularz przesyłania pliku */}
          <form onSubmit={handleUpload} className="flex flex-col w-full gap-4">
            <div
              className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 bg-gray-50 hover:shadow-xl duration-300 hover:scale-[1.02] ${isDragging ? "border-blue-500 shadow-xl" : "border-gray-300"}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 py-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">{isUploading ? "Wysyłanie..." : "Dodaj plik"}</span> lub upuść go tutaj
                </p>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileSelect} disabled={isUploading} />
              </label>
            </div>

            <input type="text" placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <textarea rows="5" placeholder="Wiadomość" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full h-24 p-2 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
            <div className="flex flex-col w-full gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-500">
                <input type="checkbox" checked={addPassword} onChange={(e) => setAddPassword(e.target.checked)} className="accent-blue-500" />
                Dodaj hasło
              </label>
              {addPassword && <input type="password" placeholder="Hasło do pliku" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border-b border-gray-300 focus:rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />}
            </div>
            <button type="submit" className="w-full text-sm font-semibold px-2 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer">
              Wyślij
            </button>
          </form>
        </div>

        {/* Prawy panel */}
        <div className="w-2/3 h-fit p-8 bg-white rounded-xl shadow-lg grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {userFiles.length > 0 ? userFiles.map((file) => <FileCard key={file.id} title={file.originalName} size={file.size} createdAt={file.createdAt} downloadId={file.downloadId} />) : <p className="text-gray-500 text-sm">Brak przesłanych plików</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
