import { Instance } from "mobx-state-tree";
import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
import { TodoModel } from '.';

export type RootInstance = Instance<typeof TodoModel>;

const store = TodoModel.create()

const StoreContext = createContext<null | RootInstance>(null);

const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={store} >
    {children}
  </StoreContext.Provider>
)

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element).isRequired,
  ]),
}

function useStore(): Instance<typeof TodoModel> {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export { StoreProvider, useStore };

