import {TasksStateType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TasksStateType, action: TaskReducerType) : TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            let stateCopy = state
            return {
            ...stateCopy,
                [action.payload.todolistID]: stateCopy[action.payload.todolistID].filter(t=> t.id !== action.payload.taskId)}
        }
        case 'ADD-TASK': {
            let stateCopy = state
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
            ...stateCopy,[action.payload.todolistID]: [newTask, ...stateCopy[action.payload.todolistID]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = state
            return {
                ...stateCopy, [action.payload.todolistID]: stateCopy[action.payload.todolistID]
                    .map(t=>t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone}: t)
            }
        }
        default:
            return state
    }
}
export type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId, todolistID
        }
    } as const
}

export const addTaskAC =(title: string, todolistID: string)=> {
    return {
        type: 'ADD-TASK',
        payload: {
            title, todolistID
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            isDone,
            todolistID
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