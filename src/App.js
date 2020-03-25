import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import Routes from "./routes/routes";

const App = () => (
    <div>
    <Routes />
    <ReduxToastr
      timeOut={5000}
      newestOnTop={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
    </div>
);

export default App;
