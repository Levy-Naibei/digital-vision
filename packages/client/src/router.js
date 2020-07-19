import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import jwt from 'jsonwebtoken';

const currentUser = jwt.decode(localStorage.getItem('token'));
const SignInComponent = React.lazy(() => import('./components/Login'));
const ShowPageComponent = React.lazy(() => import('./components/ShowPage'))
const Routes = ({ appProps}) => {
    const newAppProps = {...appProps, currentUser };
    return (
      <Suspense fallback={<div>
          Loading....
      </div>}>
          <Switch>
              <div className="routes">
                  <AppliedRoute path="/" exact component={SignInComponent} appProps={appProps} />
                  {
                      currentUser?.email  ? <AppliedRoute path="/home" exact component={ShowPageComponent} appProps={newAppProps}/>: <></>
                  }
              </div>
          </Switch>
      </Suspense>
    );
};

export default Routes;
