export {};

declare global {
  type User = {
    token: string;
    username: string;
    email: string;
    quizzes?: Quiz[];
  };

  type UserState = {
    user: User | null;
    setUser: (_: User | null) => void;
  };

  type Quiz = {
    user: string;
    title: string;
    questions: Array<Question>;
  };

  type Question = {
    body: string;
    picture: File | null;
    answers: Array<Answer>;
  };

  type Answer = {
    body: string;
    correct: boolean;
  };
}
