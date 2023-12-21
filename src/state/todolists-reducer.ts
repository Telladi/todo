import {TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
        switch (action.type) {
            case 'REMOVE-TODOLIST' : {
                return state.filter(el => el.id != action.payload.id)
            }
            case 'ADD-TODOLIST' : {
                // let newTodolistId = v1()
                // let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
                // setTodolists([newTodolist, ...todolists])
                // setTasks({...tasks, [newTodolistId]: []})
                let stateCopy = state;
                let newTodolistId = v1()
                let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: "all"}
                return [...stateCopy, newTodolist]
            }
            default: return state
        }
}

export type TodolistReducerType = RemoveTodolistACType | AddTodolistACType
export type RemoveTodolistACType =  ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id
        }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title
        }
    } as const
}
export const changeTodolistAC = () => {
    return {
        type: "CHANGE-TODOLIST"
    } as const
}

export const changeFilterAC = () => {
    return {
        type: "CHANGE-FILTER"
    } as const
}


