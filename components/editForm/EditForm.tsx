import { Button, Card, Checkbox, DisplayText, Icon, Page, TextField } from '@shopify/polaris';
import { ArrowLeftMinor } from '@shopify/polaris-icons';
import { Task } from 'mst';
import { observer } from 'mobx-react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../helpers/axiosInstance';
import styles from './editForm.module.scss';
import { useStore } from 'mst/setup';

type PropType = {
    task: Task
}

const EditForm: FC<PropType> = ({ task }) => {
    const {editTodo}= useStore()
    const [taskTitle, setTaskTitle] = useState(task?.title);
    const [taskContent, setTaskContent] = useState(task?.content);
    const [taskDone, setTaskDone] = useState(task?.isDone);

    async function handleEditTask() {
        if (taskTitle !== '' && taskContent != '') {
            try {
                const todoUpdate ={ id: task.id, title: taskTitle, content: taskContent, isDone: taskDone };
                let res = await axiosInstance().put('tasks', todoUpdate);
                if (res.status === 200) {
                    toast.success('Edit task success!', { position: 'bottom-right' })
                    editTodo(todoUpdate)
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

                    <Button primary onClick={handleEditTask}> Save</Button>
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


export default observer(EditForm)