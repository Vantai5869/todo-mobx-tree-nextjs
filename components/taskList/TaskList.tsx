import { DataTable, Button, Card, Page, DisplayText, Checkbox } from '@shopify/polaris';
import { v4 as uuidv4 } from 'uuid';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import axiosInstance from 'helpers/axiosInstance';
import { Task, Todo } from 'mst';
import ModalDelete from 'components/model/ModelDeleteTask';
import styles from './taskList.module.scss';


type PropsStore = {
    store?: Todo,
}

const TaskList: FC<PropsStore> = ({ store }) => {
    const [todoCurrent, setTodoCurrent] = useState(null);
    const { todos } = store
    function handleChange(todo: Task) {
        try {
            axiosInstance().put('tasks', { id: todo.id, isDone: !todo.isDone });
        } catch (error) {
            console.log(error)
        }
        todo.updateDoneTask()
    };

    function handleCloneTask(todo: Task) {
        try {
            axiosInstance().post('tasks', { ...todo, id: uuidv4() })
        } catch (error) {
            console.log(error)
        }
        store.cloneTodo({ ...todo, id: uuidv4() })

    };


    function handleDeleteTask(todo: Task) {
        setTodoCurrent(todo)
    }

    const list = todos.map((todo) => {

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
                <Link href={'/edit/' + todo.id} passHref>
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
                        totals={['', '', '', 0,]}
                    />
                </Card>
            </Page>
            <ModalDelete todo={todoCurrent} />
        </>
    );
}

export default inject('store')(
    observer(TaskList)
);