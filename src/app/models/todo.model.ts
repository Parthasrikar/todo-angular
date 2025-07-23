export interface Todo {
  _id: string;
  title: string;
  content: string; 
  done : boolean,
  createdAt?: Date;
  updatedAt?: Date;
}