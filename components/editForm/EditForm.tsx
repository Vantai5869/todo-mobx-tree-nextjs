import { Button, Card, Icon, Page, TextField, Checkbox, DisplayText } from '@shopify/polaris';
import { ArrowLeftMinor } from '@shopify/polaris-icons';
import React, { FC, useState } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../helpers/axiosInstance';
import styles from './editForm.module.scss';
import { Task } from 'mst';

type PropType = {
    task: Task
}

const EditForm: FC<PropType> = ({ task }) => {
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskContent, setTaskContent] = useState(task.content);
    const [taskDone, setTaskDone] = useState(task.isDone);

    async function editTask() {
        if (taskTitle !== '' && taskContent != '') {
            try {
                let res = await axiosInstance().put('tasks', { id: task.id, title: taskTitle, content: taskContent, isDone: taskDone });
                if (res.data.success === true) {
                    toast.success('Edit task success!', { position: 'bottom-right' })
                }
                else {
                    alert('Sửa task không thành công!');
                };
            } catch (error) {
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

                    <Button primary onClick={editTask}> Save</Button>
                </div>
                <DisplayText size="small" >Edit Todo</DisplayText>
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


export default EditForm