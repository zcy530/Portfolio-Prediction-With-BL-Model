const AddTaskFormTwo = ({ newTask, newTaskWeight, setNewTask, setNewTaskWeight, addTask }) => {
    return(
      <section  id="todolist">
        {/* Add Task */}
        <div className="row">
          <div className="col">
            <input 
              value={newTask}
              onChange={ (e) => setNewTask(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Input Stock Code"
            />
          </div>
          <div className="col">
            <input 
              value={newTaskWeight}
              onChange={ (e) => setNewTaskWeight(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Input Weight"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={addTask}
              className=" btn-lg"
            >Add Stock Code</button>
          </div>
        </div>
        <br />
      </section>
    )
  }
  
  export default AddTaskFormTwo;