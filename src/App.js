import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "../src/components/loader/Loader";

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
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          )}
        />
        <Route
          path="/home"
          exact
          component={() => (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
