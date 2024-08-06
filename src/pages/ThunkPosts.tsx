import { ThunkAddPostForm, ThunkPostsList } from "../components";

const ThunkPosts = () => {
    return (
        <section className="posts">
            <ThunkAddPostForm />
            <ThunkPostsList />
        </section>
    );
};

export default ThunkPosts;
