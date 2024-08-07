import { Basics, Posts, ThunkPosts, Todos } from "../pages";

type Route = { title: string; path: string; Element?: () => JSX.Element };

export const routesData: Route[] = [
    { title: "Basics", path: "/", Element: Basics },
    { title: "Data Flow - Posts App", path: "/data-flow", Element: Posts },
    { title: "Redux Thunk", path: "/thunk", Element: ThunkPosts },
    { title: "RTK", path: "/rtk", Element: Todos },
];
