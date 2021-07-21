import { Button, Card, Checkbox, DisplayText, Icon, Page, TextField } from '@shopify/polaris';
import { ArrowLeftMinor } from '@shopify/polaris-icons';
import { observer } from 'mobx-react';
import { useStore } from 'mst/setup';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from '../../helpers/axiosInstance';
import styles from './taskForm.module.scss';

const TaskForm: FC<{}> = () => {
    const {newTask} = useStore()
    const [taskTitle, setTaskTitle] = useState('');
    const [taskContent, setTaskContent] = useState('');
    const [taskDone, setTaskDone] = useState(false);

   async function addTask() {
        if (taskTitle !== '' && taskContent != '') {
            const task = { id: uuidv4(), title: taskTitle, content: taskContent, isDone: taskDone };
            setTaskTitle('');
            setTaskContent('');
            setTaskDone(false);
            try {
                let res = await axiosInstance().post('tasks', task)
                if(res.status===201){
                    newTask(task)
                    toast.success("Add task success!", { position: 'bottom-right' })
                }
            } catch (error) {
                toast.error("Error!", { position: 'bottom-right' })
                console.log(error)
            }
        }
        else {
            alert('Chưa điền đủ thông tin các trường!');
        }
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


export default observer(TaskForm) 