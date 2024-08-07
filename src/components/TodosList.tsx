import { Check, CheckCheck, Trash } from "lucide-react";
import { Todo, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../features/api";

const TodosList = () => {
    const { isError, isLoading, isSuccess, error, data: todos } = useGetTodosQuery();
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    const getError = () => {
        if (isError && "data" in error) return (error.data as string)?.toString?.();
        return JSON.stringify(error);
    };

    const handleDeleteTodo = (id: string | number) => () => {
        deleteTodo(id);
    };

    const handleStatusChange = (todo: Todo) => () => {
        updateTodo({ ...todo, completed: !todo.completed });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{getError()}</p>;
    if (!isSuccess) return null;

    return (
        <section className="todos-list">
            {todos.map(t => (
                <article key={t.id}>
                    <h3>{t.title}</h3>
                    <button onClick={handleStatusChange(t)}>{t.completed ? <CheckCheck width={18} /> : <Check width={18} />}</button>
                    <button onClick={handleDeleteTodo(t.id)}>
                        <Trash width={18} />
                    </button>
                </article>
            ))}
        </section>
    );
};

export default TodosList;
