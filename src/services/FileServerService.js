import axios from "axios";
import {EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET, EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME} from "@env";
import { Platform } from "react-native";

const prepareImageForUpload = (imageSource) => {
  // Handle web platform
  if (Platform.OS === 'web') {
    // If imageSource is already a File object (from web input), return as is
    if (imageSource instanceof File) {
      return imageSource;
    }
    
    // If it's a blob URL or other web format, create a file
    return {
      uri: imageSource,
      type: 'image/jpeg',
      name: 'upload.jpg'
    };
  }
  
  // Handle mobile platform
  return {
    uri: imageSource,
    type: 'image/jpeg',
    name: 'upload.jpg'
  };
};

const subirImagenACloudinary = async (imageSource) => {
  const data = new FormData();
  const file = prepareImageForUpload(imageSource);
  
  data.append("file", file);
  data.append("upload_preset", EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  data.append("cloud_name", EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      data,
      { 
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log("Imagen subida:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const FileServerService = {
  subirImagenACloudinary,
};