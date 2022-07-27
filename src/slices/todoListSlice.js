import {createSlice} from "@reduxjs/toolkit";

const todoListSlice = createSlice({
    name: "todoList",
    initialState: [],
    reducers: {
        todoListAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
        },
        todoListDelete: {
            reducer: (state, action) => {
                return state.filter(task => task.id !== action.payload.id)
            }
        },
        todoListMarkDone: {
            reducer: (state, action) => {
                state.map(task => {
                    if (task.id === action.payload.id) {
                        return ({...task})
                    }
                    return task;
                })
            }
        },
        setTodoList: {
            reducer: (state, action) => {
                return action.payload
            }
        }
    },
})

export default todoListSlice.reducer
export const {todoListAdded, todoListDelete, todoListMarkDone, setTodoList} = todoListSlice.actions
export const selectTodoList = state => state.todoList