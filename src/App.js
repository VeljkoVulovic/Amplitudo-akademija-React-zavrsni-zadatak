import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const Login = React.lazy(() => import("./pages/login/Login"));
const Home = React.lazy(() => import("./pages/home/Home"));

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
        <Route
          path="/home"
          exact
          component={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
