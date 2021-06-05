import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const Login = React.lazy(() => import("./pages/login/Login"));

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path={["/", "/login"]}
          exact
          component={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
