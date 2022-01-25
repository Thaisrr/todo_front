import {Table} from "@/tools/interfaces/Table";

export default interface Todo {
    id?: number;
    name: string;
    description: string;
    table: Table
}
