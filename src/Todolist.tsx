import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {CheckBox} from "./components/CheckBox";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)


    const addTask = (title: string) => {

        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const callBackHandler = (tID: string, value: boolean) => {
        props.changeTaskStatus(tID,value, props.id)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*<button onClick={removeTodolistHandler}>X</button>*/}
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task) => {

                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(task.id, newTitle, props.id)
                    }

                    return (

                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            {/*<input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>*/}
                            <CheckBox checked={task.isDone} callBack={(value) =>{callBackHandler(task.id, value)}}/>
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                            {/*<button onClick={onClickHandler}>✖️</button>*/}
                            <IconButton onClick={onClickHandler}><Delete/></IconButton>
                        </li>
                    )
                })}

            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color='secondary'
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color='primary'
                >Active

                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color='inherit'
                >Completed
                </Button>
            </div>
        </div>
    )
}