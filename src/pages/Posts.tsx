import { AddPostForm, PostsList } from "../components";

const Posts = () => {
    return (
        <section className="posts">
            <AddPostForm />
            <PostsList />
        </section>
    );
};

export default Posts;
