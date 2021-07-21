import 'react-toastify/dist/ReactToastify.css';
import EditForm from "components/editForm/EditForm";
import { Task } from "mst";
import * as Config from './../../constants/Config';

const Edit: React.FC<{ task: Task }> = ({ task }) => {
    return (
        <div>
            <EditForm task={task} />
        </div>

    );
}

export const getServerSideProps = async ({ params }) => {
    try {
        const res = await fetch(`${Config.API_URL}/tasks/${params.id}`);
        const data = await res.json();
        if (!data) {
            return {
                notFound: true
            };
        };
        return {
            props: {
                task: data
            },
        };
    } catch (error) {
        console.log(error)
    }
}

export default Edit;