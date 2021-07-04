import React from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";
import Routes from "./routes/routes";

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

function App() {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        closeButton={<CloseButton />}
      />
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
