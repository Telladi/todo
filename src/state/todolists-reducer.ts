import {TodolistType} from "../App";

export const todolistsReducer = (state: TodolistType[], action: any): TodolistType[] => {
        switch (action.type) {
            case 'XXX' : {
                return state.filter(el => el.id != action.payload.id)
            }
            default: return state
        }
}


export type RemoveTodolistACType =  ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    } as const
}
export const addTodolistAC = () => {
    return {
        type: "ADD-TODOLIST"
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


