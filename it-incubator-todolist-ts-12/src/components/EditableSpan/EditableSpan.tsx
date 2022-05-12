import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    // console.log('EditableSpan was rendered')

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        props.onChange(title);
        if (e.key === 'Enter') {
            setEditMode(false);
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField
            size={'small'}
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}
            onKeyPress={onKeyPressHandler}
        />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
