import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/slice";
import { useSelector } from "../store";

const initialState = { title: "", content: "" };

const AddPostForm = () => {
    const [formData, setFormData] = useState(initialState);
    const { id } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(ps => ({ ...ps, [e.target.name]: e.target.value }));
    };

    const handleCreateForm = (e: FormEvent) => {
        e.preventDefault();
        if (!id) return alert("Add user from basics!");
        dispatch(createPost(formData));
        setFormData(initialState);
    };

    return (
        <form className="create-post" onSubmit={handleCreateForm}>
            <h2>Create Post</h2>
            <input type="text" placeholder="Title" name="title" onChange={handleFormChange} value={formData.title} required />
            <input type="text" placeholder="Content" name="content" onChange={handleFormChange} value={formData.content} required />
            <button>Create</button>
        </form>
    );
};

export default AddPostForm;
