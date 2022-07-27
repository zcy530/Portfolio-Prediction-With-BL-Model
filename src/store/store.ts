import {configureStore} from "@reduxjs/toolkit";
import {api} from "../api/api"
import todoListSlice from "../slices/todoListSlice"
import todoListTwoSlice from "../slices/todoListTwoSlice"

const store = configureStore({
    reducer: {
        todoList: todoListSlice,
        todoListTwo: todoListTwoSlice,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})
export default store