import React, { useState } from "react";

export const AppContext = React.createContext({
  email: "",
  token: "",
  role: "user",
  isLoggedIn: false,
  loginHandler: (loginObj) => {},
  logoutHandler: () => {},
});

function getDataFromLocalStorage() {
  const data = localStorage.getItem("loginConfig");
  if (data) {
    const { email, token, role } = JSON.parse(data);
    return { email: email, token: token, role: role };
  } else {
    return { email: null, token: null, role: "user" };
  }
}

function AppContextProvider({ children }) {
  const {
    email: emailFromLS,
    token: tokenFromLS,
    role: roleFromLS,
  } = getDataFromLocalStorage();
  const [email, setEmail] = useState(emailFromLS);
  const [token, setToken] = useState(tokenFromLS);
  const [role, setRole] = useState(roleFromLS);

  const isLoggedIn = !!token;

  function loginHandler(loginConfig) {
    const { email, token, role } = loginConfig;

    // setting role as ADMIN
    if (role === "admin") {
      setRole("admin");
    }

    setToken(token);
    setEmail(email);
    const newLoginConfig = {
      email: email,
      token: token,
      role: role,
    };
    localStorage.setItem("loginConfig", JSON.stringify(newLoginConfig));
  }

  function logoutHandler() {
    if (isLoggedIn) {
      const response = window.confirm("Are you sure you want to LOGOUT ?");
      if (response) {
        setToken(null);
        setEmail(null);
        setRole("user");
        localStorage.removeItem("loginConfig");
      }
    }
  }

  const contextValue = {
    // user: {
    //   email: email,
    //   phone: "",
    //   name: "",
    //   profile: "",
    //   address: "",
    // },
    email: email,
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    role: role,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;
