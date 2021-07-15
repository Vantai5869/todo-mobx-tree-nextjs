import { Button, Card, Page, TextField } from "@shopify/polaris";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from "mst";
import { useState } from "react";
import axiosInstance from '../../helpers/axiosInstance';
import * as Config from './../../constants/Config';
import EditForm from "components/editForm/EditForm";

const Edit: React.FC<{ task: Task }> = ({ task }) => {
    const [taskValue, setTaskValue] = useState(task.content);

    function onChange(data: string) {
        setTaskValue(data);
    };

    function editItem(id: string) {
        axiosInstance().put('tasks', { id: id, content: taskValue });
        toast.success('Edit task success!', { position: 'bottom-right' })
    }

    return (
        <div>
            <EditForm task={task} />
        </div>
        // <Page>
        //     <Card>
        //         <Button url='/'> Back </Button>
        //         <div className='editForm'>
        //             <TextField
        //                 label=''
        //                 value={taskValue}
        //                 onChange={onChange}
        //                 id={task.id}
        //             />
        //             <div className="btnSubmit">
        //                 <Button
        //                     primary
        //                     onClick={() => editItem(task.id)}
        //                 >
        //                     Edit
        //                 </Button>
        //             </div>


        //         </div>
        //     </Card>
        //     <ToastContainer />
        // </Page>
    );
}

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${Config.API_URL}tasks/${params.id}`);
    const data = await res.json();
    if (!data) {
        return {
            notFound: true
        };
    };
    return {
        props: {
            task: data.task
        },
    };
}

export default Edit;