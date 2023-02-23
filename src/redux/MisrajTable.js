import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getPosts = createAsyncThunk(
    "misrajTableSlice/getPosts",
    async () => {
        const response = await fetch("https://graphqlzero.almansi.me/api", {
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify({
                query: `query (
                    $options: PageQueryOptions
                  )
                {
                    posts(options: $options) {
                      data {
                        id
                        title
                      }
                      meta {
                        totalCount
                      }
                    }
                  }`
            })
        }).then(res => res.json()).then(res => res.data.posts.data)

        return response;


    }
);

const misrajTableSlice = createSlice({
    name: "misrajTableSlice",
    initialState: {
        status: "idle",
        misrajApi: [],
        errorMessage: "",
    },
    reducers: {
        getFormValue: (state, action) => {
            state.misrajApi.push(action.payload)

        }
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = "loading";
        },
        [getPosts.fulfilled]: (state, action) => {
            state.misrajApi = action.payload;

            state.status = "fulfilled";
        },
        [getPosts.rejected]: (state, action) => {
            state.status = "error";
            state.errorMessage = "Could not fetch data. Please refresh to try again."
        },
    },


})
// export const { halland } = misrajTableSlice.actions
// export default misrajTableSlice.reducer
const { actions, reducer } = misrajTableSlice;
export const { getFormValue } = actions;
export default reducer