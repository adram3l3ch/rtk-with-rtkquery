import { useSelector } from "../store";
import { useDispatch } from "react-redux";
import { decrease, increase, reset } from "../features";

const Counter = () => {
    const { count } = useSelector(store => store.counter);
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <div className="counter-display">
                <button onClick={() => dispatch(decrease())}>-</button>
                <span>{count}</span>
                <button onClick={() => dispatch(increase())}>+</button>
            </div>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
};

export default Counter;
