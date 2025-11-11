import api from "./axios";

export const uploadFile = async (formData) => {
  const response = await api.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getUserFiles = async () => {
  const response = await api.get("/files/myfiles");
  return response.data.files;
};
