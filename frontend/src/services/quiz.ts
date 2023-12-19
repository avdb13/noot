import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const uploadImages = (token: string, images: Array<File>) => {
  const data = new FormData();

  for (const image of images) {
    data.append('image', image, image.name)
  }

  axios.post(
    `${baseUrl}/quiz/upload`,
    data,
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
