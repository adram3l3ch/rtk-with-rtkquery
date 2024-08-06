import { Heart, Laugh, ThumbsDown, Trash } from "lucide-react";
import { useDispatch, useSelector } from "../store";
import { fetchPosts, thunkAddReaction, thunkRemovePost } from "../features";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";

dayjs.extend(relativeTime);

const REACTIONS = [
    { id: "love", icon: <Heart width={15} /> },
    { id: "dislike", icon: <ThumbsDown width={15} /> },
    { id: "laugh", icon: <Laugh width={15} /> },
] as const;

const ThunkPostsList = () => {
    const { postsList, error, status } = useSelector(store => store.thunkPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") dispatch(fetchPosts());
    }, [dispatch, status]);

    const handleRemovePost = (id: string | number) => () => {
        dispatch(thunkRemovePost(id));
    };

    const handleAddReaction = (id: string | number, reaction: (typeof REACTIONS)[number]["id"]) => () => {
        dispatch(thunkAddReaction({ id, reaction }));
    };

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p className="error">{error}</p>;

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {postsList.map(p => (
                <article key={p.id} className="post">
                    <button className="delete" onClick={handleRemovePost(p.id)}>
                        <Trash width={15} />
                    </button>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <footer>
                        {dayjs(p.createdOn).fromNow()}
                        <div className="reactions">
                            {REACTIONS.map(r => (
                                <button onClick={handleAddReaction(p.id, r.id)} key={r.id}>
                                    {r.icon} {p.reactions?.[r.id] || 0}
                                </button>
                            ))}
                        </div>
                    </footer>
                </article>
            ))}
        </section>
    );
};

export default ThunkPostsList;
