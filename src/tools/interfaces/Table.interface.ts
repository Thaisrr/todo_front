import Todo from "@/tools/interfaces/Todo";

export interface Table {
    id: number,
    name: string,
    todos: Todo[],
    created_at: any
}
