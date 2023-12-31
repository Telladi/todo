import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)


    const addItem = () => {

        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addItem()
        }
    }
    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            {/*<button onClick={addItem}>+</button>*/}
            <TextField
            variant='outlined'
            value={title}
            onKeyPress={onKeyPressHandler}
            onChange={onChangeHandler}
            error={!!error}
            label="Title"
            helperText={error}
            />
            <IconButton color="primary" onClick={addItem}><AddBox/></IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}