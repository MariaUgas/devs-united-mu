import React from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import MainOther from "./pages/MainOther";
import MainUser from "./pages/MainUser";
import NotFound from "./pages/NotFound";
import Setting from "./pages/Setting";

const App = () => {
  return (
    <div className="body">
      <Route exact path="/" render={() => <Login />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/user" render={() => <MainUser />} />
      <Route path="/other" render={() => <MainOther />} />
      {/* <Route exact path="*" component={NotFound} /> <Route path="/setting" component={Setting} />*/}
    </div>
  );
};

export default App;
