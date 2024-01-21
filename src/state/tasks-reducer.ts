import {TasksStateType} from "../AppWithReducer";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: TaskReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            let stateCopy = state
            return {
                ...stateCopy,
                [action.payload.todolistId]: stateCopy[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let stateCopy = state
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...stateCopy, [action.payload.todolistId]: [newTask, ...stateCopy[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = state
            return {
                ...stateCopy, [action.payload.todolistId]: stateCopy[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = state
            return {
                ...stateCopy, [action.payload.todolistId]: stateCopy[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        }
        case 'ADD-TODOLIST' : {
            let stateCopy = state
            return {
                ...stateCopy, [action.payload.todolistId] : []
            }
        }

        case 'REMOVE-TODOLIST' : {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy

        }
        default:
            return state
    }
}
export type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId, todolistId
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title, todolistId
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            title,
            taskId,
            todolistId
        }
    } as const
}