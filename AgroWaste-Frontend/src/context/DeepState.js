import React, { useEffect, useState } from "react";
import DeepContext from "./DeepContext";

const DeepState = (props) => {
  const loginC = localStorage.getItem('loginC') || 'false';
  const loginF = localStorage.getItem('loginF') || 'false';
  const loginA = localStorage.getItem('loginA') || 'false';

  const [user, setUser] = useState(null);
  const [alert, setalert] = useState(null);
  const [loggedinC, setLoggedinC] = useState(loginC);
  const [loggedinF, setLoggedinF] = useState(loginF);
  const [loggedinA, setLoggedinA] = useState(loginA);
  const [EndObject, setEndObject] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("userLogin");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error restoring user session", e);
    }
  }, []);

  const LoginC = (value, state) => {
    localStorage.setItem("loginC", state);
    setLoggedinC(state);
  };

  const LoginF = (state) => {
    localStorage.setItem("loginF", state);
    setLoggedinF(state);
  };

  const LoginA = (state) => {
    localStorage.setItem("loginA", state);
    setLoggedinA(state);
  };

  const FullfillRequest = (element) => {
    setEndObject(element);
  };

  const showAlert = (message, type = "info", duration = 3800) => {
    setalert({
      id: Date.now(),
      msg: message,
      type: type === "danger" ? "error" : type,
      duration: duration
    });
  };

  const hideAlert = () => {
    setalert(null);
  };

  return (
    <DeepContext.Provider
      value={{
        showAlert,
        hideAlert,
        alert,
        user,
        setUser,
        LoginC,
        loggedinC,
        LoginA,
        loggedinA,
        LoginF,
        loggedinF,
        EndObject,
        FullfillRequest
      }}
    >
      {props.children}
    </DeepContext.Provider>
  );
};

export default DeepState;
