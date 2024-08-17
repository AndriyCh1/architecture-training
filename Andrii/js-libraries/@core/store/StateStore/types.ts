export type StateStore<State> = {
  getState: () => State;
  setState: (state: Partial<State>) => void;
  subscribe: (handler: (state: State) => void) => () => void;
};
