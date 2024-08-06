import { Heart, Laugh, ThumbsDown, Trash } from "lucide-react";
import { useSelector } from "../store";
import { useDispatch } from "react-redux";
import { addReaction, removePost } from "../features";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const REACTIONS = [
    { id: "love", icon: <Heart width={15} /> },
    { id: "dislike", icon: <ThumbsDown width={15} /> },
    { id: "laugh", icon: <Laugh width={15} /> },
] as const;

const PostsList = () => {
    const posts = useSelector(store => store.posts);
    const dispatch = useDispatch();

    const handleRemovePost = (id: string | number) => () => {
        dispatch(removePost(id));
    };

    const handleAddReaction = (id: string | number, reaction: (typeof REACTIONS)[number]["id"]) => () => {
        dispatch(addReaction({ id, reaction }));
    };

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {posts.map(p => (
                <article key={p.id} className="post">
                    <button className="delete" onClick={handleRemovePost(p.id)}>
                        <Trash width={15} />
                    </button>
                    <h3>{p.title}</h3>
                    <p>{p.content}</p>
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

export default PostsList;
