import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response: any = await apiClient.signIn(username, password);

    localStorage.setItem("credentials", JSON.stringify(response.user)); // Store user credentials in local storageresponse);
    if (response.message === "Sign-in successful") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign In</h2>
        <Input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
