import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
        switch (action.type) {
            case 'REMOVE-TODOLIST' : {
                let stateCopy = state
                return stateCopy.filter(el => el.id != action.payload.todolistId)
            }
            case 'ADD-TODOLIST' : {
                let stateCopy = state;
                let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: "all"}
                return [...stateCopy, newTodolist]
            }
            case 'CHANGE-TODOLIST-TITLE': {
                let stateCopy = state;
                return stateCopy.map(el => el.id === action.payload.id ? {...el, title: action.payload.title}: el)

            }
            case 'CHANGE-TODOLIST-FILTER' : {
                let stateCopy = state;
                return stateCopy.map(el=>el.id === action.payload.todolistId ? {...el, filter: action.payload.filter}: el)
            }
            default: return state
        }
}

export type TodolistReducerType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType
export type RemoveTodolistACType =  ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,title
        }
    } as const
}

export const changeFilterAC = (filter: FilterType, todolistId: string) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
           todolistId, filter
        }
    } as const
}


