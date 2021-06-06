import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import Loader from "../src/components/loader/Loader";
import PrivateRoute from "./privateRoute/PrivateRoute";

const Login = React.lazy(() => import("./pages/login/Login"));
const Home = React.lazy(() => import("./pages/home/Home"));

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute
          path={["/", "/login"]}
          exact
          component={() => (
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          )}
        />
        <PrivateRoute
          path="/home"
          exact
          component={() => (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          )}
          isPrivate
        />
      </Switch>
    </div>
  );
}

export default App;
