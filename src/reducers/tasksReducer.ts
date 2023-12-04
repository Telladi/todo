import {TaskType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TaskType[], action: ReducerType) : TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            let stateCopy = state
            return stateCopy.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            let stateCopy = state
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return [...stateCopy, newTask]
        }
        default:
            return state
    }
}
export type ReducerType = RemoveTaskACType | AddTaskACType
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id
        }
    } as const
}

export const addTaskAC =(title: string)=> {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}