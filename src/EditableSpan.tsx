import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string)=> void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const[editMode, setEditMode] = useState<boolean>(false)
    const[title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = ()=> {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        // ? <input value={title}
        //          onChange={onChangeTitleHandler}
        //          onBlur={activateViewMode}
        //          autoFocus/>

        ? <TextField
            variant='outlined'
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}