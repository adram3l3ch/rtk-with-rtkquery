import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/posts";

type Post = {
    id: number | string;
    body: string;
    title: string;
    createdOn: Date | string;
    reactions: {
        love: number;
        laugh: number;
        dislike: number;
    };
};

// const postsAdapter = createEntityAdapter<Post>({});

const initialState = {
    postsList: [] as Post[],
    status: "idle" as "idle" | "loading" | "success" | "failed",
    error: null as string | null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await axios.get(URL);
    return data;
});

const thunkPostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        thunkAddPost: (state, action: PayloadAction<Post>) => {
            state.postsList.unshift(action.payload);
        },
        thunkRemovePost: (state, action: PayloadAction<string | number>) => {
            return { ...state, postsList: state?.postsList.filter(p => p.id !== action.payload) };
        },
        thunkCreatePost: (state, action: PayloadAction<Pick<Post, "title" | "body">>) => {
            state.postsList.unshift({
                ...action.payload,
                id: nanoid(),
                reactions: { dislike: 0, laugh: 0, love: 0 },
                createdOn: new Date().toString(),
            });
        },
        thunkAddReaction: (state, action: PayloadAction<{ id: string | number; reaction: keyof Post["reactions"] }>) => {
            const { id, reaction } = action.payload;
            const targetPost = state.postsList.find(p => p.id === id);
            if (targetPost) targetPost.reactions[reaction] += 1;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, state => {
            state.status = "loading";
        });
        builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Omit<Post, "createdOn" | "reactions">[]>) => {
            const posts = action.payload;
            const structuredPosts = posts.map(p => ({ ...p, createdOn: new Date().toString(), reactions: { dislike: 0, laugh: 0, love: 0 } }));
            state.postsList = structuredPosts;
            state.status = "success";
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || null;
        });
    },
});

// const { selectAll, selectById,selectIds ,selectEntities} = postsAdapter.getSelectors(state => state.posts);

export const { thunkAddPost, thunkRemovePost, thunkCreatePost, thunkAddReaction } = thunkPostsSlice.actions;
export const thunkPostsReducer = thunkPostsSlice.reducer;
export default thunkPostsReducer;
