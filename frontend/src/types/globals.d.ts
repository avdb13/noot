export {};

declare global {
  type User = {
    username: string;
    email: string;
    quizzes?: Quiz[];
  };

  type Credentials = { id: string; password: string };

  type UserState = {
    user: User | null;
    setUser: (_: User | null) => void;
    login: (_: Credentials) => Promise<void>;
    logout: () => void;
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
