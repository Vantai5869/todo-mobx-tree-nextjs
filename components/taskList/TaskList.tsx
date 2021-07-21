import { Button, Card, Checkbox, DataTable, DisplayText, Page } from '@shopify/polaris';
import ModalDelete from 'components/model/ModelDeleteTask';
import axiosInstance from 'helpers/axiosInstance';
import { observer } from 'mobx-react';
import { Task } from 'mst';
import { useStore } from 'mst/setup';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './taskList.module.scss';

let renderTimes = 0;
const TaskList = () => {
    const { fetchingTodo, todos, cloneTodo, total } = useStore()
    const [todoCurrent, setTodoCurrent] = useState(null);
    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        if (renderTimes === 0) {
            fetchingTodo()
            renderTimes = 1
        }
    }, [])

    function handleChange(todo: Task) {
        try {
            axiosInstance().put('tasks', { id: todo.id, isDone: !todo.isDone });
        } catch (error) {
            console.log(error)
        }
        todo.updateDoneTask()
    };

    function handleCloneTask(todo: Task) {
        let taskClone = { ...todo, id: uuidv4() }
        try {
            axiosInstance().post('tasks', taskClone)
        } catch (error) {
            console.log(error)
        }
        cloneTodo(taskClone)
    };

    function handleDeleteTask(todo: Task) {
        setTodoCurrent(todo)
        setShowModel(!showModel)
    }

    const list = todos.map((todo) => {
        const Edit= todo.updateTask
        return [
            todo.title,
            todo.content,
            <Checkbox
                key={todo.id}
                label=''
                checked={todo.isDone}
                onChange={() => handleChange(todo)}
            />,
            <div key={todo.id} className={styles.btnGroupAction}>
                <Button onClick={() => handleCloneTask(todo)}>clone</Button>
                <Link href={{pathname:'/edit/'+todo.id, query:{edit: JSON.stringify(todo)}}}  passHref>
                    <a>
                        <Button>edit</Button>
                    </a>
                </Link>
                <Button onClick={() => handleDeleteTask(todo)}>delete</Button>
            </div>
        ]
    })

    return (
        <>
            <Page >
                <div className={styles.topList} >
                    <DisplayText size="small" >Todo App</DisplayText>
                    <Link href="/new-task" >
                        <a>
                            <Button primary>
                                Add Todo
                            </Button>
                        </a>
                    </Link>
                </div>
                <Card>
                    <DataTable
                        columnContentTypes={[
                            'text',
                            'text',
                            'text',
                            'text',
                        ]}
                        headings={[
                            'Title',
                            'Content',
                            'Check',
                            'Action',
                        ]}
                        rows={list}
                        totals={['', '', '', total,]}
                    />
                </Card>
            </Page>
            <ModalDelete todo={todoCurrent} show={showModel} />
        </>
    );
}

export default observer(TaskList)
