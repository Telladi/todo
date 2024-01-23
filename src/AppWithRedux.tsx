import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskReducerType,
    tasksReducer
} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistReducerType,
    todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"

function AppWithReducer() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>> (state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType> (state => state.tasks)

    const dispatch = useDispatch()

    /*let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, TodolistReducerType>>(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])*/

    // let [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TaskReducerType>>(tasksReducer,
    //     {
    //         [todolistID1]: [
    //             {id: v1(), title: 'HTML&CSS', isDone: true},
    //             {id: v1(), title: 'JS', isDone: true},
    //             {id: v1(), title: 'ReactJS', isDone: false},
    //
    //         ],
    //         [todolistID2]: [
    //             {id: v1(), title: 'Rest API', isDone: true},
    //             {id: v1(), title: 'GraphQL', isDone: false},
    //         ]
    //     }
    // )

    const addTask = (title: string, todolistId: string) => {
        // let task = {id: v1(), title: title, isDone: false}
        // let todolistTasks = tasks[todolistId]
        // tasks[todolistId] = [task, ...todolistTasks]
        // setTasks({...tasks})
        dispatch(addTaskAC(title, todolistId))
    }


    const changeFilter = (value: FilterType, todolistId: string) => {
        // let todolist = todolists.find(tl => tl.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
        dispatch(changeFilterAC(value, todolistId))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        // let todolistTasks = tasks[todolistId]
        //
        // tasks[todolistId] = todolistTasks.filter(task => task.id != id)
        //
        // setTasks({...tasks})
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        // let todolistTasks = tasks[todolistId]
        //
        // let task = todolistTasks.find(task => task.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        // let todolistTasks = tasks[todolistId]
        //
        // let task = todolistTasks.find(task => task.id === id)
        // if (task) {
        //     task.title = newTitle
        //     setTasks({...tasks})
        // }
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    const removeTodolist = (id: string) => {
        // setTodolists(todolists.filter(todolist => todolist.id != id))
        // delete tasks[id]
        //
        // setTasks({...tasks})
        dispatch(removeTodolistAC(id))
    }
    const addTodolist = (title: string) => {
        // let newTodolistId = v1()
        // let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({...tasks, [newTodolistId]: []})
        dispatch(addTodolistAC(title))
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))

    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let allTodolistTasks = tasks[todolist.id]
                            let tasksForTodolist = allTodolistTasks


                            if (todolist.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            }


                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        changeTodolistTitle={changeTodolistTitle}
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>

                        })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;
