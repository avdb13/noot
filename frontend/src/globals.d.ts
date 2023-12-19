declare global {
  type Quiz = {
    user: string;
    title: string;
    questions: Array<Question>;
  }

  type Question = {
    body: string;
    picture: File | null;
    answers: Array<Answer>;
  };

  type Answer = {
    body: string;
    correct: boolean;
  }
}

export {}
