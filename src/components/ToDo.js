import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const ToDo = ({toDo, markDone, setUpdateData, deleteTask}) => {
    return (<>
        {toDo && toDo
            .slice()
            .sort((a, b) => a.id > b.id ? 1 : -1)
            .map((task, index) => {
                return (
                    <React.Fragment key={task.id}>
                        <div className="col taskBg">
                            <div className=''>
                                <span className="taskNumber">{index + 1}</span>
                                <span className="taskText">{task.code}</span>
                            </div>
                            <div className="iconsWrap">
                            <span code="Completed / Not Completed"
                                  onClick={e => markDone(task.id)}
                            >
                            </span>
                                <span title="Edit"
                                        onClick={() => setUpdateData({
                                            id: task.id, code: task.code
                                        })}
                                >
                                    <FontAwesomeIcon icon={faPen}/>
                                </span>

                                <span title="Delete"
                                      onClick={() => deleteTask(task.id)}
                                >
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </span>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
    </>)
}

export default ToDo;