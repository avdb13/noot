import axios from "axios";
import { Quiz } from "../quiz/Create";

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

export const uploadQuiz = (token: string, quiz: Quiz) => {
  axios.post(
    `${baseUrl}/quiz`,
    quiz,
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
