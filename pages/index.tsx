import { Provider } from "mobx-react";
import { observer } from 'mobx-react';
import { setupRootStore } from "mst/setup";
import { useEffect } from "react";
import TaskList from "components/taskList/TaskList";

const Home = observer((props) => {
  const store = setupRootStore().rootTree
  const { fetchingTodo } = store

  useEffect(() => {
    fetchingTodo()
  }, [fetchingTodo])

  return (
    <>
      <Provider store={store}>
        <TaskList />
      </Provider>
    </>
  )
})


export default Home