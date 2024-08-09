import { BadgePlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAddTodoMutation, useGetTodosQuery } from "../features/api";

const TodoForm = () => {
    const [newTodo, setNewTodo] = useState("");
    const [addTodo] = useAddTodoMutation();
    const { data: todos } = useGetTodosQuery();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await addTodo({ completed: false, title: newTodo, userId: 1, id: `${+(todos?.[0].id || 0) + 1}` });
        setNewTodo("");
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="newTodo"
                placeholder="Type here..."
                value={newTodo}
                onChange={({ target }) => setNewTodo(target.value)}
                required
            />
            <button>
                <BadgePlus width={20} />
                ADD
            </button>
        </form>
    );
};

export default TodoForm;
