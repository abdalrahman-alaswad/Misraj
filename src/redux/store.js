import { configureStore } from "@reduxjs/toolkit";
import misrajTableReducer from "./MisrajTable";

const store = configureStore({
    reducer: {
        misraj: misrajTableReducer
    },

})
export default store