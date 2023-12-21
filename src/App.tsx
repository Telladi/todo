import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";

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

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

  /*  let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })*/
    let [tasks, dispatchTasks] = useReducer(tasksReducer,

        [ {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},]

         )

    const addTask = (title: string, todolistId: string) => {
        // let task = {id: v1(), title: title, isDone: false}
        // let todolistTasks = tasks[todolistId]
        // tasks[todolistId] = [task, ...todolistTasks]
        // setTasks({...tasks})
        dispatchTasks(addTaskAC(title))
    }


    const changeFilter = (value: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const removeTask = (id: string, todolistId: string) => {
        // let todolistTasks = tasks[todolistId]
        //
        // tasks[todolistId] = todolistTasks.filter(task => task.id != id)
        //
        // setTasks({...tasks})
        dispatchTasks(removeTaskAC(id))
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        // let todolistTasks = tasks[todolistId]
        //
        // let task = todolistTasks.find(task => task.id === id)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }
        dispatchTasks(changeTaskStatusAC(id, isDone))
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]

        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(todolist => todolist.id != id))
        delete tasks[id]

        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }

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

export default App;
