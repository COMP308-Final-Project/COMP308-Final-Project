import { useState, useContext, useEffect } from "react";
import accountContext from "../context/accountContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { loggedIn, userType, userId } = useContext(accountContext);
  const navigate = useNavigate();

  console.log(
    `Logged in: ${loggedIn}, userType: ${userType}, userId: ${userId}`
  );

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
