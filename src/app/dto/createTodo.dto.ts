export interface CreateTodoDto {
  title: string;
  content: string; // Made required to match interface
  done?: boolean;  // Made required to match interface
}