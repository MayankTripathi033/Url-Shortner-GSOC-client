import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const SignOut: React.FC = () => {
  const navigate = useNavigate();

  const handleSignInRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">You have been signed out</h1>
      <Button onClick={handleSignInRedirect} className="mt-4">
        Sign In Again
      </Button>
    </div>
  );
};

export default SignOut;
