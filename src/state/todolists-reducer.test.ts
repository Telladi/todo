import {v1} from "uuid";
import {TodolistType} from "../App";
import {removeTodolistAC, todolistsReducer} from "./todolists-reducer";


test (' correct todolist be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
    const endState = todolistsReducer(startState, removeTodolistAC)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)

});
