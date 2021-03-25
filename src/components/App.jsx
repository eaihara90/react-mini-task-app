import { Component } from 'react';
import { Status } from '../containers/Status/Status';
import { TaskModel } from '../models/task.model';
import { Notification } from '../containers/Notification/Notification';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            notification: {
                message: '',
                state: false
            }
        };
    }

    addNewTaskHandler = (newTask) => {
        const prevTasks = [...this.state.tasks];

        prevTasks.push(new TaskModel(this.state.tasks.length + 1, 'new', newTask));
        
        const updatedTasks = [...prevTasks];

        this.setState({ tasks: updatedTasks });   
    }

    changeNotification = (notificationInfo) => {
        const { message, state } = notificationInfo;
        
        this.setState({ notification: { message, state } });

        if (state) {
            setTimeout(() => this.setState({ notification: { message: '', state: false } }), 30000);
        }
    }

    changeStatusHandler = (status, taskId) => {
        const updatedTasks = this.state.tasks.map(task => {
            task.status = task._id === taskId ? status : task.status;
            return task;
        });

        this.setState({ tasks: updatedTasks});
    }

    clearStorageHandler = () => {
        window.localStorage.removeItem('tasks');

        this.changeNotification({ message: 'Local storage cleared', state: true })
    }

    componentDidMount() {
        this.loadTasks();
    }

    loadTasks = () => {
        const tasks = JSON.parse(window.localStorage.getItem('tasks'));

        if (tasks === undefined || tasks === null)
        {
            return;
        }

        if (tasks.length && tasks.length > 0) {
            this.setState({tasks: tasks});
        }
    }

    saveHandler = () => {
        window.localStorage.setItem('tasks', JSON.stringify(this.state.tasks));

        this.changeNotification({ message: 'Tasks saved to local storage', state: true })
    }

    render() {
        const newTasks = this.state.tasks.filter(task => task.status === 'new');
        const holdTasks = this.state.tasks.filter(task => task.status === 'hold');
        const progressTasks = this.state.tasks.filter(task => task.status === 'progress');
        const doneTasks = this.state.tasks.filter(task => task.status === 'done');

        return(
            <div className="App">
                <div className="control">
                    <div className="control__icons">
                        <svg onClick={ this.saveHandler } aria-hidden="true" focusable="false" data-prefix="fas" data-icon="save" className="svg-inline--fa fa-save fa-w-14 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path className="icon" fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>
                        </svg>
                        <svg  onClick={ this.clearStorageHandler }aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" className="svg-inline--fa fa-eraser fa-w-16 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path className="icon" fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"></path>
                        </svg>
                    </div>

                    <span className="line"></span>
                </div>
                <Status tasks={ newTasks } status={ 'New' } addNewTask={ ($event) => this.addNewTaskHandler($event) } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) }/>
                <Status tasks={ holdTasks } status={ 'Hold' } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) } />
                <Status tasks={ progressTasks } status={ 'Progress' } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) } />
                <Status tasks={ doneTasks } status={ 'Done' } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) } />

                { this.state.notification.state === true ? <Notification message={ this.state.notification.message }/> : null }
            </div>
        )
    }
}

export default App;
