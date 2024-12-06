export type User = {
  _id: string;
  username: string;
  likedQuestions: [];
  createdQuestions: [];
};

//NewUsers id genereras av MongoDB NÄR en ny användare skapas
export type NewUser = {
  username: string;
  likedQuestions: [];
  createdQuestions: [];
};
