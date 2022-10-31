import { useState, useEffect } from "react";

// initialize global state variables so all registered comps share the same state
let globalState = {};
//listeners will be array of functions, one of which is setState from useState
let listeners = [];

//actions should be an obj with keys that match actionIdentifier and value is concrete function
let actions = {};

//adding a setState function for the listening comp that uses custom hook when that comp mounts and removing it when it unmounts

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  //Defining abstract definition of store management system, will define concrete actions in different place.
  const dispatch = (actionIdentifier, payload) => {
    //Search for action using actionIdentifier in action obj, I expect that action as a function that I execute and save as newState - basically a reducerFn.
    const newState = actions[actionIdentifier](globalState, payload);

    //Merge newState with old state a.k.a globalState.
    globalState = { ...globalState, ...newState };

    //Inform all listeners about that state update by passing new globalState to listener array.This updates the react useState state bc it's where the listener comes from, with new globalState. Hence, React will re-render the comp using my custom hook with new state.
    for (const listener of listeners) {
      listener(globalState);
    }
  };
  //Managing the listeners.
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

// Merging what there is in globalState with the initial state of this concrete instantiation of this state, so can manage multiple things with this global store.
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
