import { TodoForm, TodosList } from "../components";

const Todos = () => {
    return (
        <section className="todos">
            <h2>Todos</h2>
            <TodoForm />
            <TodosList />
        </section>
    );
};

export default Todos;
