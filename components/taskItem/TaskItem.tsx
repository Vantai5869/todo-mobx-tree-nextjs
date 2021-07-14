import { Button, Checkbox } from '@shopify/polaris';
import { v4 as uuidv4 } from 'uuid';
import { inject, observer } from 'mobx-react';
import axiosInstance from 'helpers/axiosInstance';
import { Task } from 'mst';
import React, { FC } from 'react';
import styles from './taskItem.module.scss';

type PropsType = {
    todo: Task,
    index: number,
    onDelete: any,
    onClone: any
}
const TaskItem: FC<PropsType> = ({ todo, index, onDelete, onClone }) => {

    function handleDeleteTask() {
        onDelete(todo.id)
        try {
            axiosInstance().delete(`tasks/${todo.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(todo: Task) {
        try {
            axiosInstance().put('tasks', { id: todo.id, isDone: !todo.isDone }).then((rr) => {
                console.log(rr)
            })
        } catch (error) {
            console.log(error)
        }
        todo.updateDoneTask()

    };

    function handleCloneTask() {
        try {
            axiosInstance().post('tasks', { ...todo, id: uuidv4() })
        } catch (error) {
            console.log(error)
        }
        onClone({ ...todo, id: uuidv4() })

    };

    return (
        <div className={styles.taskItem}>
            <div className={styles.tdId}> {index}</div>
            <div className={styles.tdContent}>{todo.content}</div>
            <div className={styles.tdCheck}>
                <Checkbox
                    label=''
                    checked={todo.isDone}
                    id={todo.id}
                    onChange={() => handleChange(todo)}
                />
            </div>
            <div className={styles.tdAction}  >
                <div className={styles.btnGroupAction} >
                    <Button size='slim' url={'edit/' + todo.id}>Edit</Button>
                    <Button size='slim' onClick={handleCloneTask}>Clone</Button>
                    <Button size='slim' onClick={handleDeleteTask}  > Delete </Button>
                </div>
            </div>
        </div>
    );
}

export default inject('store')(
    observer(TaskItem)
);