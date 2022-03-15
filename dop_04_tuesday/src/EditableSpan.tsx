import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
        props.onChangeTitle(title)
    }
    const offEditMode = () => setEditMode(false)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (

        editMode
            ? <input
                autoFocus
                onChange={onChangeTitleHandler}
                value={title}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>

    );
};

