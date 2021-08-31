import React, { useState } from 'react';
import TodoList from './TodoList';

const TodoHeader = () => {

    const [tasks, setTasks] = useState([])
    const [todoTitle, setTodoTitle] = useState('')
    const [todoDate, setTodoDate] = useState('')

    const objTask = {
        id: Date.now(),
        date: todoDate,
        title: todoTitle,
        completed: false
    }

    const addTodo = (event) => {

        if (todoDate !== '' && todoTitle !== '') {
            if (event.key === 'Enter') {
                setTasks([
                    ...tasks,
                    objTask
                ])
                setTodoTitle('')
                setTodoDate('')
            }
        } else if (todoDate !== '') {
            const modalWindow = <div>input date</div>
            return modalWindow
        }

    }


    const deleteTaskItem = (id) => {
        const dataDrag = document.querySelector(`[data-item='${id}']`)
        dataDrag.parentNode.removeChild(dataDrag);

    }

    const dragItems = document.querySelectorAll('.todo');
    console.log('dragItems', dragItems)

    function dragstart(e) {
        console.log('drag start', e.target)
        e.target.classList.add('hold')
        setTimeout(() => e.target.classList.add('hide'), 0)
        e.dataTransfer.setData('dataItem', e.target.dataset.item)

    }

    function dragend(e) {
        console.log('drag end', e.target)
        e.target.classList.remove('hold', 'hide')
    }


    dragItems.forEach((dragItem) => {
        dragItem.addEventListener('dragStart', dragstart)
        dragItem.addEventListener('dragEnd', dragend)
    })


    const dropZones = document.querySelectorAll('.zone-1', 'zone-2')
    console.log('dropZones', dropZones)

    dropZones.forEach((dropZone) => {
        dropZone.addEventListener('dragOver', dragover)
        dropZone.addEventListener('dragLeave', dragleave)
        dropZone.addEventListener('dragEnter', dragenter)
        dropZone.addEventListener('dragndrop', dragndrop)

    })

    function dragover(e) {
        console.log('drag over', e.target)
        e.preventDefault()
    }

    function dragenter(e) {
        console.log('drag enter', e.target)
        e.target.classList.add('hovered')

    }
    function dragleave(e) {
        console.log('drag leave', e.target)
        e.target.classList.remove('hovered')
    }
    function dragndrop(e) {
        e.target.classList.remove('hovered')

        const currentItem = e.dataTransfer.getData('dataItem')
        const dataDrag = document.querySelector(`[data-item='${currentItem}']`)
        e.target.append(dataDrag)

   

    }


    return (
        <div className='container'>
            <h1>Todo app</h1>

            <div className='input-title'>
                <input
                    className='inputDate'
                    readonly
                    type='date'
                    value={todoDate}
                    onChange={(event) => setTodoDate(event.target.value)}
                    min="2000-01-01"
                    max="2050-01-08"
                    onKeyPress={addTodo}
                />


                <input
                    className='inputTask'
                    type='text'
                    placeholder='new task'
                    value={todoTitle}
                    onChange={(event) => setTodoTitle(event.target.value)}
                    onKeyPress={addTodo}
                />
            </div>

            <div className='urgentStatus'>
                <div className='Urgent'>urgent</div>
                <div className='NotUrgent'>not urgent</div>
            </div>

            <div className='zones'>
                <div className='zone-1'
                    onDragOver={(e) => dragover(e)}
                    onDragEnter={(e) => dragenter(e)}
                    onDragLeave={(e) => dragleave(e)}
                    onDrop={(e) => dragndrop(e)}>
                        <TodoList tasks={tasks}
                deleteTaskItem={deleteTaskItem}
                dragstart={dragstart}
                dragend={dragend}
            />
                </div>

                <div className='zone-2'
                    onDragOver={(e) => dragover(e)}
                    onDragEnter={(e) => dragenter(e)}
                    onDragLeave={(e) => dragleave(e)}
                    onDrop={(e) => dragndrop(e)}
                >
                </div>
            </div>
            
        </div>
    )
}


export default TodoHeader;