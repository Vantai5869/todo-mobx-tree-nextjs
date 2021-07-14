import { Button, Card, Icon, Page } from '@shopify/polaris';
import { CirclePlusMinor } from '@shopify/polaris-icons';
import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../helpers/axiosInstance';
import styles from './taskForm.module.scss';

const TaskForm: FC<{}> = () => {
    const [taskValue, setTaskValue] = useState('');

    function addTask() {
        if (taskValue !== '') {
            let task = { id: uuidv4(), content: taskValue };
            setTaskValue('');
            try {
                axiosInstance().post('tasks', task)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert('vui long nhap ten cong viec!');
        }
        toast.success("Add task success!", { position: 'bottom-right' })
    };

    function handleKeyPress(event: { key: string }) {
        if (event.key === 'Enter') {
            addTask();
        };
    };

    return (
        <Page>
            <Card>
                <Button url='/'> Back </Button>
                <div className={styles.form_group} >
                    <input
                        type="text"
                        className={styles.inputTask}
                        style={{ border: 'none' }}
                        placeholder='Nhập công việc...'
                        value={taskValue}
                        onChange={(e) => setTaskValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />

                </div>
                <button className={styles.btnAdd} onClick={addTask}>
                    Add
                </button>
            </Card>
            <ToastContainer />
        </Page>
    );
}


export default TaskForm