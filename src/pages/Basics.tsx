import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { updateUser } from "../features";
import { Counter } from "../components";

const Basics = () => {
    const { age, id, name } = useSelector(store => store.user);
    const { count } = useSelector(store => store.counter);
    const dispatch = useDispatch();

    const handleAddUser = () => {
        dispatch(updateUser({ age: 12, id: 1234, name: "John Doe" }));
    };

    const handleRemoveUser = () => {
        dispatch(updateUser());
    };

    return (
        <div className="basics">
            {id ? (
                <div className="user">
                    <h2>
                        <span>Name:</span> {name}
                    </h2>
                    <h3>
                        <span>Age:</span> {age}
                    </h3>
                    <button onClick={handleRemoveUser}>Remove user</button>
                </div>
            ) : (
                <button onClick={handleAddUser}>Add user</button>
            )}
            {count}
            <Counter />
        </div>
    );
};

export default Basics;
