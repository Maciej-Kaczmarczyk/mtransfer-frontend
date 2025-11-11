import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../api/axios";
import { toast } from "sonner";

const Download = () => {
  const { id } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileInfo = async () => {
      try {
        const res = await axios.get(`/files/info/${id}`);
        setFileInfo(res.data.file);
      } catch (err) {
        toast.error("Nie znaleziono pliku lub link wygasł ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchFileInfo();
  }, [id]);

  console.log(fileInfo);

  const handleDownload = async () => {
    try {
      const res = await axios.get(`/files/download/${id}`, {
        responseType: "blob",
        params: fileInfo.password ? { password } : {},
      });

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileInfo.originalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Pobieranie rozpoczęte ✅");
    } catch (err) {
      if (err.response?.status === 401) toast.error("Nieprawidłowe hasło ❌");
      else toast.error("Błąd podczas pobierania pliku ❌");
    }
  };

  if (loading) return <div className="text-gray-500 text-center mt-8">Wczytywanie...</div>;
  if (!fileInfo) return <div className="text-red-500 text-center mt-8">Nie znaleziono pliku</div>;

  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-blue-500">
      <div className="w-96 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 items-center text-center">
        <h2 className="text-2xl font-bold text-gray-800">{fileInfo.originalName}</h2>
        <p className="text-sm text-gray-600">
          {(fileInfo.size / 1024 / 1024).toFixed(2)} MB
        </p>

        {fileInfo.password && (
          <input
            type="password"
            placeholder="Podaj hasło do pliku"
            className="w-full p-2 border rounded-md border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button
          onClick={handleDownload}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Pobierz plik
        </button>
      </div>
    </div>
  );
};

export default Download;
