import TaskForm from '../../components/taskForm/TaskForm';

export interface NewTaskProps {

}

const NewTask: React.FC<NewTaskProps> = () => {
    return (
        <div>
            <TaskForm />
        </div>
    );
}

export default NewTask;

