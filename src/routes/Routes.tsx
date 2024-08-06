import { Route, Routes } from "react-router-dom";
import { routesData } from "./routesData";

const RoutesList = () => {
    return (
        <Routes>
            {routesData.map(ele => (
                <Route path={ele.path} element={ele.Element ? <ele.Element /> : null} key={ele.path} />
            ))}
        </Routes>
    );
};

export default RoutesList;
