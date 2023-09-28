
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export interface ApiResponse<T> extends Array<T> {

  }
  
  export interface CreateTodoPayload {
    title: string;
  }
  
  export interface UpdateTodoPayload {
    title?: string;
    completed?: boolean;
  }
  