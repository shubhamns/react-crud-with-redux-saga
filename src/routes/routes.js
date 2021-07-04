import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "../containers/UserList";
import UserCreate from "../containers/UserCreate";
import UserUpdate from "../containers/UserUpdate";

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route exact path="/create" component={UserCreate} />
        <Route exact path="/update/:id" component={UserUpdate} />
      </Switch>
    </Router>
  );
};

export default Routers;
