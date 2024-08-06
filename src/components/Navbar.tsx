import { routesData } from "../routes";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <h2>Redux Tutorial</h2>
            {routesData.map(ele => (
                <NavLink to={ele.path} key={ele.path}>
                    <button>{ele.title}</button>
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;
