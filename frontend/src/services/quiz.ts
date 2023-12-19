import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const uploadQuiz = (token: string, quiz: Quiz) => {
  const data = new FormData();

  for (const [i, image] of quiz.questions.map(q => q.picture).entries()) {
    if (!image) {
      continue;
    }
    data.append('image', image, image.name)
  }

  const quizWithoutImages = ({...quiz, questions: quiz.questions.map(q => {
    const {picture: _, ...rest} = q;
    return rest;
  })})


  axios.post(
    `${baseUrl}/quiz`,
    quizWithoutImages,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  axios.post(
    `${baseUrl}/quiz/images`,
    data,
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
