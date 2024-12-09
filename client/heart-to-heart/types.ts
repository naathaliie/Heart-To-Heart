/*****USERS*****/
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

/*****LEVELS*****/
export type Level = {
  _id: string;
  level: string;
  description: string;
};

/*****CATEGORIES*****/
export type Category = {
  _id: string;
  title: string;
  description: string;
  levelType: string;
};
