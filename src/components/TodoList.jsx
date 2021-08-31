import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
    const { tasks, deleteTaskItem, dragstart, dragend } = props;

    return (
        <div>
            {tasks.map(item => <TodoItem key={item.id}
                {...item}
                deleteTaskItem={deleteTaskItem}
                dragstart={dragstart}
                dragend={dragend}
            />)}
        </div>
    )
}

export default TodoList;