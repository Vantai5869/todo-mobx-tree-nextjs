import axiosInstance from "helpers/axiosInstance";
import { types, Instance, applySnapshot } from "mobx-state-tree";


const TaskItemModel = types
  .model("TaskItem", {
    id: types.string,
    content: types.string,
    isDone: types.boolean
  })
  .actions(self => ({
    editTask(newName: string) {
      self.content = newName
    },
    updateDoneTask() {
      self.isDone = !self.isDone
    }
  }));


const TodoModel = types
  .model("Todo", {
    todos: types.array(TaskItemModel),
  })
  .actions(self => ({
    fetchingTodo: async () => {
      try {
        let fetch = await axiosInstance().get('tasks')
        applySnapshot(self, {
          ...self,
          todos: fetch.data.tasks
        });

      } catch (err) {

      }
    },

    newTask(task: Task) {
      self.todos.push(TaskItemModel.create(task))
    },

    deleteTodo: (todoId: string) => {
      applySnapshot(self, {
        ...self,
        todos: self.todos.filter((todo: Task) => todo.id !== todoId)
      });
    },

    cloneTodo: (todo: Task) => {
      applySnapshot(self, {
        ...self,
        todos: [...self.todos, todo]
      });
    },

  }))

export { TodoModel };

export type Todo = Instance<typeof TodoModel>;
export type Task = Instance<typeof TaskItemModel>;
