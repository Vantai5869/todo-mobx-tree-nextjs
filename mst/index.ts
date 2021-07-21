import axiosInstance from "helpers/axiosInstance";
import { cast, flow, Instance, types } from "mobx-state-tree";

type TTask={
  id: string,
  title: string,
  content: string,
  isDone: boolean
}

const TaskItemModel = types
  .model("TaskItem", {
    id: types.string,
    title: types.string,
    content: types.string,
    isDone: types.boolean
  })
  .actions(self => ({
    updateTask(title: string, content: string) {
      self.title = title;
      self.content = content;
    },
    updateDoneTask() {
      self.isDone = !self.isDone;
    }
  }));


const TodoModel = types
  .model("Todo", {
    todos: types.array(TaskItemModel),
  })
  .actions(self => ({
    fetchingTodo: flow(function* () {
      try {
        const response: Task[] = yield axiosInstance().get('tasks')
          .then((value) => value.data);
        self.todos = cast(response);
      } catch (error) {
        console.log(error)
      }

    }),

    newTask(task: TTask) {
      self.todos.push(TaskItemModel.create(task))
    },

    deleteTodo: (todoId: string) => {
      let index= self.todos.findIndex(item=> item.id ===todoId)
      self.todos.splice(index,1);
    },

    cloneTodo: (todo: Task) => {
      self.todos.push(todo)
    },

    editTodo:(todo:TTask)=>{
      let index= self.todos.findIndex(item=> item.id ===todo.id)
      self.todos[index] = cast(todo)
    }

  }))
  .views(self => ({
    get total() {
      return self.todos.length
    },
  }))

export { TodoModel };

export type Todo = Instance<typeof TodoModel>;
export type Task = Instance<typeof TaskItemModel>;
