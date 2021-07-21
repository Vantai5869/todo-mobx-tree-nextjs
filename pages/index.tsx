import TaskList from "components/taskList/TaskList";
import { observer } from 'mobx-react';
const Home = observer((props) => {

  return (
    <>
        <TaskList />
    </>
  )
})


export default Home