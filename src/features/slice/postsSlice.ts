import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

type Post = {
    id: number | string;
    content: string;
    title: string;
    createdOn: Date | string;
    reactions: {
        love: number;
        laugh: number;
        dislike: number;
    };
};

const initialState: Post[] = [
    {
        id: 1,
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eos veniam aspernatur tenetur maxime voluptatum asperiores, aliquam odio, error incidunt iste eveniet",
        title: "Redux data flow in practical",
        reactions: { love: 0, laugh: 0, dislike: 0 },
        createdOn: new Date().toString(),
    },
];

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.unshift(action.payload);
        },
        removePost: (state, action: PayloadAction<string | number>) => {
            return state?.filter(p => p.id !== action.payload);
        },
        createPost: (state, action: PayloadAction<Pick<Post, "title" | "content">>) => {
            state.unshift({ ...action.payload, id: nanoid(), reactions: { dislike: 0, laugh: 0, love: 0 }, createdOn: new Date().toString() });
        },
        addReaction: (state, action: PayloadAction<{ id: string | number; reaction: keyof Post["reactions"] }>) => {
            const { id, reaction } = action.payload;
            const targetPost = state.find(p => p.id === id);
            if (targetPost) targetPost.reactions[reaction] += 1;
        },
    },
});

export const { addPost, removePost, createPost, addReaction } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
export default postsReducer;
