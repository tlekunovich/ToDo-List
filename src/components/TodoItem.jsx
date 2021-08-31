import React, { useState } from 'react';
import { IoTrashSharp } from "react-icons/io5";

const TodoItem = (props) => {
    const { id, date, title, completed, deleteTaskItem, dragstart, dragend } = props;

    const [checked, setChecked] = useState(completed)

    const style = ['todo']

    if (checked) {
        style.push('completed')
    }


    return (
        <div className={style.join(' ')}
            data-item={`${id}`}
            onDragStart={(e) => dragstart(e)}
            onDragEnd={(e) => dragend(e)}
            draggable='true'>
            
            {/* <div className= > */}
                <input
                    className='checkbox'
                    type='checkbox'
                    defaultChecked={false}
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
                <span className='date'>{date}</span>
                <span className='title'>{title}</span>
                <div className='btnDelete'>
                    <IoTrashSharp className='btn' onClick={() => deleteTaskItem(id)} />
                </div>
            </div>
        // </div>
    )
}

export default TodoItem;