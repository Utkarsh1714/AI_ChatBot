import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/users/register", {
        name,
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
            Register
          </h1>
          <p className="text-xl font-medium text-center md:text-2xl">
            Sign up to continue
          </p>
          <form
            onSubmit={submitHandler}
            className="w-64 pt-10 space-y-5 md:w-96"
          >
            <div className="flex flex-col">
              <label className="font-mono tracking-wider">Your Name</label>
              <input
                className="px-4 py-2 border-2 border-black"
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Name"
              />
            </div>
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
                Sign Up
              </button>
            </div>
            <p className="text-center">
              Don't have an account ?{" "}
              <Link to={"/login"} className="underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    // <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
    //   <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    //     <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-sky-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    //     <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    //       <div className="max-w-md mx-auto">
    //         <div>
    //           <h1 className="text-2xl font-semibold">Register</h1>
    //         </div>
    //         <div className="divide-y divide-gray-200">
    //           <form
    //             onSubmit={submitHandler}
    //             className="flex flex-col items-center justify-center py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
    //           >
    //             <div className="relative">
    //               <input
    //                 onChange={(e) => setName(e.target.value)}
    //                 autoComplete="off"
    //                 name="name"
    //                 type="text"
    //                 className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
    //                 placeholder="Enter your name"
    //               />
    //               <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
    //                 Your Name
    //               </label>
    //             </div>
    //             <div className="relative">
    //               <input
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 autoComplete="off"
    //                 name="email"
    //                 type="text"
    //                 className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
    //                 placeholder="Email address"
    //               />
    //               <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
    //                 Email Address
    //               </label>
    //             </div>
    //             <div className="relative">
    //               <input
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 autoComplete="off"
    //                 name="password"
    //                 type="password"
    //                 className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
    //                 placeholder="Password"
    //               />
    //               <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
    //                 Password
    //               </label>
    //             </div>
    //             <div className="relative py-4">
    //               <button className="px-2 py-1 text-white rounded-md bg-cyan-500">
    //                 Submit
    //               </button>
    //             </div>
    //             <div>
    //               <p>
    //                 Already have an account ?{" "}
    //                 <Link to={"/login"} className="text-blue-500 underline">
    //                   Log In
    //                 </Link>
    //               </p>
    //             </div>
    //           </form>
    //         </div>
    //       </div>

    //       <div className="flex justify-center w-full">
    //         <button className="flex items-center px-6 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    //           <svg
    //             className="w-6 h-6 mr-2"
    //             xmlns="http://www.w3.org/2000/svg"
    //             xmlnsXlink="http://www.w3.org/1999/xlink"
    //             width="800px"
    //             height="800px"
    //             viewBox="-0.5 0 48 48"
    //             version="1.1"
    //           >
    //             {" "}
    //             <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
    //             <defs> </defs>{" "}
    //             <g
    //               id="Icons"
    //               stroke="none"
    //               strokeWidth="1"
    //               fill="none"
    //               fillRule="evenodd"
    //             >
    //               {" "}
    //               <g
    //                 id="Color-"
    //                 transform="translate(-401.000000, -860.000000)"
    //               >
    //                 {" "}
    //                 <g
    //                   id="Google"
    //                   transform="translate(401.000000, 860.000000)"
    //                 >
    //                   {" "}
    //                   <path
    //                     d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
    //                     id="Fill-1"
    //                     fill="#FBBC05"
    //                   >
    //                     {" "}
    //                   </path>{" "}
    //                   <path
    //                     d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
    //                     id="Fill-2"
    //                     fill="#EB4335"
    //                   >
    //                     {" "}
    //                   </path>{" "}
    //                   <path
    //                     d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
    //                     id="Fill-3"
    //                     fill="#34A853"
    //                   >
    //                     {" "}
    //                   </path>{" "}
    //                   <path
    //                     d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
    //                     id="Fill-4"
    //                     fill="#4285F4"
    //                   >
    //                     {" "}
    //                   </path>{" "}
    //                 </g>{" "}
    //               </g>{" "}
    //             </g>{" "}
    //           </svg>
    //           <span>Continue with Google</span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Register;
