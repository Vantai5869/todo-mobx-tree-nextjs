import { onSnapshot } from "mobx-state-tree";
import { TodoModel } from ".";

export const setupRootStore = () => {
  const rootTree = TodoModel.create({
    todos: []
  });
  onSnapshot(rootTree, snapshot => console.log("snapshot: ", snapshot));
  return { rootTree };
};
