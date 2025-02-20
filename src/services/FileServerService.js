import axios from "axios";
import {CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME} from "@env";

const subirImagenACloudinary = async (imageUri) => {
  const data = new FormData();
  
  data.append("file", {
    uri: imageUri,
    type: "image/jpeg", // Ajusta según el formato de imagen
    name: "upload.jpg",
  });

  data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // 👈 Cambia esto por tu preset de Cloudinary
  data.append("cloud_name", CLOUDINARY_CLOUD_NAME); // 👈 Cambia esto por tu nombre de Cloudinary

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Imagen subida:", response.data.secure_url);
    return response.data.secure_url; // Devuelve la URL de la imagen
  } catch (error) {
    console.error("Error subiendo imagen:", error);
  }
};


export const FileServerService = {
  subirImagenACloudinary,
};
