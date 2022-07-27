import {useState} from 'react';
import AddTaskFormTwo from './AddTaskFormTwo';
import UpdateForm from './UpdateForm';
import ToDoTwo from './ToDoTwo';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {selectTodoListTwo, todoListTwoAdded, todoListTwoDelete, todoListTwoMarkDone, setTodoListTwo} from "../slices/todoListTwoSlice";

function App() {

    // Tasks (ToDo List) State
    const todoListTwo = useSelector(selectTodoListTwo)
    console.log(todoListTwo)
    const dispatch = useDispatch()

    // Temp State
    const [newTask, setNewTask] = useState('');
    const [newTaskWeight, setNewTaskWeight] = useState('');
    const [updateData, setUpdateData] = useState("");

    // Add task
    ///////////////////////////
    const addTask = e => {
        e.preventDefault()
        if (newTask) {
            console.log(todoListTwo)
            dispatch(todoListTwoAdded({id: todoListTwo.length + 1, code: newTask, weight: newTaskWeight }))
            setNewTask('');
            setNewTaskWeight('');
        }
    }

    return (
        <div className="">
            <AddTaskFormTwo
                newTask={newTask}
                newTaskWeight={newTaskWeight}
                setNewTask={setNewTask}
                setNewTaskWeight={setNewTaskWeight}
                addTask={addTask}
            />

            <ToDoTwo
                toDo={todoListTwo}
                markDone={id => dispatch(todoListTwoMarkDone({id}))}
                setUpdateData={setUpdateData}
                deleteTask={id => dispatch(todoListTwoDelete({id}))}
            />

        </div>
    );
}

export default App;
