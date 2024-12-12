/*****USERS*****/
export type User = {
  _id: string;
  username: string;
  likedQuestions: Question[];
  createdQuestions: Question[];
};

//NewUsers id genereras av MongoDB NÄR en ny användare skapas
export type NewUser = {
  username: string;
  likedQuestions: [];
  createdQuestions: [];
};

export type NewLike = {
  _id: string;
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

/*****QUESTIONS*****/
export type Question = {
  _id: string;
  questionText: string;
  categoryType: string;
};

export type NewQuestion = {
  questionText: string;
  categoryType: string;
};

/*****OTHER TYPES*****/
export type Options = {
  title: string;
  screen: string;
};
