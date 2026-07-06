import { useQueries } from "@tanstack/react-query";
import { getTodos } from "./api";

export function useTodos()  {

        return useQueries({
                queryKey:["todos"],
                queryFn:getTodos,
        })
}

export function useTodo(todoId:number)  {

        return useQueries({
                queryKey:["todos",todoId],
                queryFn:getTodos,
        })
}