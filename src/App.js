import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import Loader from "../src/components/loader/Loader";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ErrorHandling from "../src/pages/errorHandling/ErrorHandling";

const Login = React.lazy(() => import("./pages/login/Login"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Clients = React.lazy(() => import("./pages/clients/Clients"));

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
        <PrivateRoute
          path="/clients"
          exact
          component={() => (
            <Suspense fallback={<Loader />}>
              <Clients />
            </Suspense>
          )}
          isPrivate
        />
        <PrivateRoute
          component={() => (
            <ErrorHandling
              error={"404"}
              errorMessage={"Sorry, the page you visited does not exist."}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
