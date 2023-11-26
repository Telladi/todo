import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"
function App() {

    let [tasks, setTasks]=useState<TaskType[]>( [{ id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }])
    let [filter, setFilter] = useState<FilterType>("all")

    let tasksForTodolist = tasks
    if(filter === "active") {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }

    if(filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    const changeFilter =(value: FilterType) => {
        setFilter(value)
    }
    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    return <div className="App">
        <Todolist title={"title"}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
        />
    </div>

}

export default App;
