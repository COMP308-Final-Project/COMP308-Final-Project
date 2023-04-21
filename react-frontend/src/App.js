import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import LandingPage from "./login/LandingPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./login/Login";
import Register from "./login/Register";
import FitnessGame from "./fitness-game/FitnessGame";
import Form from "./form/Form";
import CovidForm from "./covid/CovidForm";
import accountContext from "./context/accountContext";
import NavBar from "./pages/NavBar";
import CovidRecords from "./covid/CovidRecords";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        courses: {
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:2003/users",
  cache,
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  return (
    <>
      <accountContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          userType,
          setUserType,
          userId,
          setUserId,
        }}
      >
        <ApolloProvider client={client}>
          <Router>
            <div className="App">
              <NavBar />
            </div>
            <div className="container">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/fitness-game" element={<FitnessGame />} />
                <Route path="/form" element={<Form />} />
                <Route path="/covid" element={<CovidForm />} />
                <Route path="/covid-records" element={<CovidRecords />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </ApolloProvider>
      </accountContext.Provider>
    </>
  );
}
export default App;
