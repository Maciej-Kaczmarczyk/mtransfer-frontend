import api from "./axios";

/**
 * Wysyła plik do serwera
 * @param {FormData} formData 
 * @returns {Promise<Object>} Dane przesłanego pliku
 */
export const uploadFile = async (formData) => {
  console.log("Uploading file with formData:", formData);
  const response = await api.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/**
 * Pobiera pliki użytkownika
 * @returns {Promise<Array>} Lista plików użytkownika
 */
export const getUserFiles = async () => {
  const response = await api.get("/files/myfiles");
  return response.data.files;
};
