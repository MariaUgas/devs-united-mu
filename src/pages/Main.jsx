import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import Setting from "./Setting";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/setting" component={Setting} />
      <Route path="/home" component={Home} />
      {/* <Route exact path="*" component={NotFound} /> */}
    </div>
  );
};

export default Main;
