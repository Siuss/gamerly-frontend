import axios from "axios";
import { FILE_SERVER_URL } from "./requestConfig";

const subirImagen = async (imagenB64) => {
  const formData = new FormData();
  formData.append("image", imagenB64);

  const response = await axios.post(FILE_SERVER_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: {
      key: process.env.EXPO_PUBLIC_FILE_SERVER_API_KEY,
    },
  });

  return response.data;
};

export const FileServerService = {
  subirImagen,
};
