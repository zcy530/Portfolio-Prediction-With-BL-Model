import {createSlice} from "@reduxjs/toolkit";

const todoListTwoSlice = createSlice({
    name: "todoListTwo",
    initialState: [],
    reducers: {
        todoListTwoAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
        },
        todoListTwoDelete: {
            reducer: (state, action) => {
                return state.filter(task => task.id !== action.payload.id)
            }
        },
        todoListTwoMarkDone: {
            reducer: (state, action) => {
                state.map(task => {
                    if (task.id === action.payload.id) {
                        return ({...task})
                    }
                    return task;
                })
            }
        },
        setTodoListTwo: {
            reducer: (state, action) => {
                return action.payload
            }
        }
    },
})

export default todoListTwoSlice.reducer
export const {todoListTwoAdded, todoListTwoDelete, todoListTwoMarkDone, setTodoListTwo} = todoListTwoSlice.actions
export const selectTodoListTwo = state => state.todoListTwo