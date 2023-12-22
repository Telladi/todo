import React, {ChangeEvent, useState} from 'react';
import {Checkbox} from "@mui/material";


export type CheckBoxPropsType = {
    callBack: (value: boolean) => void
    checked: boolean
}
export const CheckBox = (props: CheckBoxPropsType) => {

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={props.checked}
            onChange={onChangeStatusHandler}
            color="primary"/>
    );
};

