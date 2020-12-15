import React from "react";
import { withRouter } from "react-router-dom";
import {
  defaultMainState,
  Actions,
  mainReducer,
  mainReducerMiddleware,
} from "../../store/index";

export interface MainStore {
  dispatch: any;
  state: any;
}

// Make a context
export const MainContext = React.createContext<MainStore>({
  dispatch: null,
  state: null,
});

type ProviderWithRouterProps = {
  children: React.ReactNode;
};

class ProviderWithRouter extends React.Component<ProviderWithRouterProps> {
  _dispatch: any;
  _state: any;

  constructor(props) {
    super(props);

    // store
    let dispatchToMainReducer;
    [this._state, dispatchToMainReducer] = React.useReducer(
      mainReducer,
      defaultMainState
    );
    this._dispatch = mainReducerMiddleware(dispatchToMainReducer);

    // initialize session
    this.dispatch({
      type: Actions.REQUEST_SESSION_FETCH,
    });
  }

  public get dispatch() {
    return this._dispatch;
  }

  render() {
    return (
      <MainContext.Provider
        value={{ dispatch: this.dispatch, state: this.state }}
      >
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

export const provider = withRouter(ProviderWithRouter);