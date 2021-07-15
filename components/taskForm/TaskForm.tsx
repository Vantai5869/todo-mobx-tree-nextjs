import { Button, Card, Icon, Page, TextField, Checkbox, DisplayText } from '@shopify/polaris';
import { ArrowLeftMinor } from '@shopify/polaris-icons';
import React, { FC, useState } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../helpers/axiosInstance';
import styles from './taskForm.module.scss';

const TaskForm: FC<{}> = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskContent, setTaskContent] = useState('');
    const [taskDone, setTaskDone] = useState(false);

    function addTask() {
        if (taskTitle !== '' && taskContent != '') {
            let task = { id: uuidv4(), title: taskTitle, content: taskContent, isDone: taskDone };
            setTaskTitle('');
            setTaskContent('');
            setTaskDone(false);
            try {
                axiosInstance().post('tasks', task)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert('Chưa điền đủ thông tin các trường!');
        }
        toast.success("Add task success!", { position: 'bottom-right' })
    };

    function onChangeTitle(data: string) {
        setTaskTitle(data);
    };
    function onChangeContent(data: string) {
        setTaskContent(data);
    };
    function onChangeCheck() {
        setTaskDone(!taskDone);
    };

    return (
        <Page >
            <Card>
                <div className={styles.topList}>
                    <Link href='/' passHref>
                        <a>
                            <Icon
                                source={ArrowLeftMinor}
                                color="base" />
                        </a>
                    </Link>

                    <Button primary onClick={addTask}> Add Todo</Button>
                </div>
                <DisplayText size="small" >Create todo</DisplayText>
                <TextField
                    value={taskTitle}
                    label='Tiêu đề'
                    onChange={onChangeTitle}
                    id={'1'}
                />
                <TextField
                    value={taskContent}
                    label='Nội dung'
                    onChange={onChangeContent}
                    multiline={4}
                    id={'1'}
                />
                <Checkbox
                    label=" Đã làm"
                    checked={taskDone}
                    onChange={() => onChangeCheck()}
                    id='1'
                />

            </Card>
            <ToastContainer />
        </Page>
    );
}


export default TaskForm