import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
        switch (action.type) {
            case 'REMOVE-TODOLIST' : {
                return state.filter(el => el.id != action.payload.id)
            }
            case 'ADD-TODOLIST' : {
                let stateCopy = state;
                let newTodolistId = v1()
                let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: "all"}
                return [...stateCopy, newTodolist]
            }
            case 'CHANGE-TODOLIST-TITLE': {
                let stateCopy = state;
                return stateCopy.map(el => el.id === action.payload.id ? {...el, title: action.payload.title}: el)

            }
            case 'CHANGE-FILTER' : {
                let stateCopy = state;
                return stateCopy.map(el=>el.id === action.payload.id ? {...el, filter: action.payload.filter}: el)
            }
            default: return state
        }
}

export type TodolistReducerType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType
export type RemoveTodolistACType =  ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>
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
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,title
        }
    } as const
}

export const changeFilterAC = (filter: FilterType, id: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
           id, filter
        }
    } as const
}


