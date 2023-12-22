import {TaskType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TaskType[], action: TaskReducerType) : TaskType[] => {
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
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = state
            let task = stateCopy.find(task => task.id === action.payload.id)
            if(task) {
                task.isDone = action.payload.isDone

            } return [...stateCopy]
        }
        default:
            return state
    }
}
export type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

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
export const changeTaskStatusAC = (id: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            isDone: isDone,
            id: id
        }
    } as const
}

export const changeTaskTitleAC = (id: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            isDone: isDone,
            id: id
        }
    } as const
}