import "./App.css";
import { Navbar } from "./components";
import { Routes } from "./routes";

const App = () => {
    return (
        <main>
            <Navbar />
            <section className="content">
                <Routes />
            </section>
        </main>
    );
};

export default App;
