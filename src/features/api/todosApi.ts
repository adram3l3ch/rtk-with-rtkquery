import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Todo = {
    completed: boolean;
    id: number | string;
    title: string;
    userId: number | string;
};

export const todosApi = createApi({
    reducerPath: "todosApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["Todos"],
    endpoints: builder => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "/todos",
            providesTags: ["Todos"],
            transformResponse: (result: Todo[]) => {
                return result?.sort((a, b) => +b.id - +a.id);
            },
        }),
        updateTodo: builder.mutation<Todo, Todo>({
            query: todo => ({
                url: `/todos/${todo.id}`,
                method: "PATCH",
                body: todo,
            }),
            invalidatesTags: ["Todos"],
        }),
        addTodo: builder.mutation<Todo, Todo>({
            query: todo => ({
                url: "/todos",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: builder.mutation<Todo, string | number>({
            query: id => ({
                url: `/todos/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todosApi;
export const todosApiReducer = todosApi.reducer;
export default todosApiReducer;
