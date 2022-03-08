import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                onChange={onChangeHandler}
                onBlur={offEditMode}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
}