import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreatePost } from "../features";
import { useSelector } from "../store";

const initialState = { title: "", body: "" };

const ThunkAddPostForm = () => {
    const [formData, setFormData] = useState(initialState);
    const { id } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(ps => ({ ...ps, [e.target.name]: e.target.value }));
    };

    const handleCreateForm = (e: FormEvent) => {
        e.preventDefault();
        if (!id) return alert("Add user from basics!");
        dispatch(thunkCreatePost(formData));
        setFormData(initialState);
    };

    return (
        <form className="create-post" onSubmit={handleCreateForm}>
            <h2>Create Post</h2>
            <input type="text" placeholder="Title" name="title" onChange={handleFormChange} value={formData.title} required />
            <input type="text" placeholder="Content" name="body" onChange={handleFormChange} value={formData.body} required />
            <button>Create</button>
        </form>
    );
};

export default ThunkAddPostForm;
