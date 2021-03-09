import { React } from 'react';
import { Task } from '../Task/Task';
import './Status.scss';

export const Status = (prop) => {
    const { tasks, addNewTask, changedStatus } = prop;

    const clearInput = ($event) => {
        $event.target.value = '';
    }

    const checkInput = ($event) => {
        const { key, target } = $event;

        if (key === "Enter" && target.value !== '')
        {
            addNewTask(target.value);
            clearInput($event);
        }
    }

    const changeStatusHandler = ($event, taskId) => {
        const { id } = $event.target;
        changedStatus(id, taskId);
    }

    return (
        <div className="status">
            <div className={ `status--${ prop.status }` }>
                <span className="status__title">{ prop.status }</span>
                { tasks.length }
                { prop.status === 'New' ?
                    <input className="input-task" type="text" onKeyUp={ ($event) => checkInput($event) } placeholder="Enter a new task" />
                    : null
                }
            </div>
            <div className="task-container">
                { tasks.map(taskItem => {
                    return <Task task={ taskItem } key={ taskItem._id } taskChangeStatus={ ($event) => changeStatusHandler($event, taskItem._id) } />
                })}
            </div>
        </div>
    )
}
