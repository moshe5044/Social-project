import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = ({ setUser, setIslog, isLog }) => {

  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const checkUserCredentials = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        const errorData = await response.json();

        if (response.status === 404) {
          throw new Error(errorData.message || "User not found");
        } else if (response.status === 401) {
          throw new Error(errorData.message || "Invalid credentials");
        } else {
          throw new Error(errorData.message || "Server error");
        }
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const credentials = {
        userName: data.UserName,
        password: data.password,
      };

      const user = await checkUserCredentials(credentials);

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setIslog(!isLog);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="logInput" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="Input"
        type="text"
        placeholder="User name.."
        {...register("UserName")}
      />
      <input
        className="Input"
        type="text"
        placeholder="Password.."
        {...register("password")}
      />
      <input className="myInput" type="submit" />
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
