import {useState} from 'react';
import AddTaskForm from './AddTaskForm';
import UpdateForm from './UpdateForm';
import ToDo from './ToDo';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {selectTodoList, setTodoList, todoListAdded, todoListDelete, todoListMarkDone} from "../slices/todoListSlice";

function App() {

    // Tasks (ToDo List) State
    const todoList = useSelector(selectTodoList)
    const dispatch = useDispatch()

    // Temp State
    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState("");

    // Add task
    ///////////////////////////
    const addTask = e => {
        e.preventDefault()
        if (newTask) {
            dispatch(todoListAdded({id: todoList.length + 1, code: newTask}))
            setNewTask('');
        }
    }

    // Change task for update
    ///////////////////////////
    const changeTask = e => {
        setUpdateData({
            id: updateData.id,
            code: e.target.value,
        });
    }

    // Update task
    ///////////////////////////
    const updateTask = () => {
        let filterRecords = [...todoList].filter(task => task.id !== updateData.id);
        let updatedObject = [...filterRecords, updateData]
        dispatch(setTodoList(updatedObject))
        setUpdateData('');
    }

    return (
        <div className="">
            {updateData && updateData ? (
                <UpdateForm
                    updateData={updateData}
                    changeTask={changeTask}
                    updateTask={updateTask}
                    cancelUpdate={() => setUpdateData("")}
                />
            ) : (
                <AddTaskForm
                    newTask={newTask}
                    setNewTask={setNewTask}
                    addTask={addTask}
                />
            )}

            {/* Display ToDos */}
            {todoList && todoList.length ? '' : ''}
            <ToDo
                toDo={todoList}
                markDone={id => dispatch(todoListMarkDone({id}))}
                setUpdateData={setUpdateData}
                deleteTask={id => dispatch(todoListDelete({id}))}
            />

        </div>
    );
}

export default App;
