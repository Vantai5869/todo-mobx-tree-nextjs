import { Button, Card, Page } from '@shopify/polaris';
import TaskItem from 'components/taskItem/TaskItem';
import { inject, observer } from 'mobx-react';
import { Task, Todo } from 'mst';
import { FC } from 'react';
import styles from './taskList.module.scss';

type PropsStore = {
    store?: Todo,
}

const TaskList: FC<PropsStore> = ({ store }) => {
    const itemsList = store.todos.map((todo: Task, index) => {
        return < TaskItem
            todo={todo}
            key={todo.id}
            index={index}
            onDelete={store.deleteTodo}
            onClone={store.cloneTodo}
        />
    })
    return (
        <>
            <Page title="Welcome todo">
                <Card>
                    <Button url='/new-task'>New Task</Button>
                </Card>
                <Card>
                    <div className={styles.headList}>
                        <div className={styles.tdId}>Id</div>
                        <div className={styles.tdContent}>Todo content</div>
                        <div className={styles.tdCheck}>Check</div>
                        <div className={styles.tdAction}>Operation</div>
                    </div>
                    <hr style={{ width: '100%', textAlign: 'center' }} />

                    {itemsList}
                </Card>
            </Page>
        </>
    );
}

export default inject('store')(
    observer(TaskList)
);