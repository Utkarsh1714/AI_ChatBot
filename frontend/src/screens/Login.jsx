import { useState, useContext } from "react";
import axios from "../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => console.log(err.response.data));
  }
  return (
    <div className="w-full h-screen">
      <div className="object-contain px-4 py-3 shadow-3xl">
        <img className="w-32 md:w-52" src={"/logo2.png"} alt="logo" />
      </div>
      <div className="top-0 flex justify-center">
        <div className="">
          <h1 className="font-serif text-4xl font-bold text-center md:text-5xl">
            Login
          </h1>
          <p className="text-xl font-medium text-center md:text-2xl">
            Sign in to continue
          </p>
          <form
            onSubmit={submitHandler}
            className="w-64 pt-10 space-y-5 md:w-96"
          >
            <div className="flex flex-col">
              <label className="font-mono tracking-wider">Email Address</label>
              <input
                className="px-4 py-2 border-2 border-black"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                placeholder="Email address"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-mono tracking-wider">Password</label>
              <input
                className="px-4 py-2 border-2 border-black"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="px-6 py-2 font-mono tracking-wider text-white bg-black"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account ?{" "}
              <Link to={"/register"} className="underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
