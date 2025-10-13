import {  useContext, useState } from "react";
import useApi from "../hooks/useApi";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { AuthContext } from "../context/AuthContext";
import { setToken } from "../lib/localstorage";
import { Link } from "react-router-dom";
import { toast} from "sonner";

const INITIAL_FORMDATA = {
  email: "",
  password: "",
};

const Login = () => {
 
  const{setAuth}=useContext(AuthContext)
  
  const [formdata, setFormdata] = useState(INITIAL_FORMDATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const { request, loading } = useApi();

  const submitHandler = async (e) => {
    e.preventDefault(); 
   const response= await request({
      endPoint: "/auth/login",
      method: "POST",
      body: formdata,
      redirectUrl:"/"
    });
    toast.success(response.message);
    setAuth({
     token: response.token,
     user: response.user
    })
    setToken(response.token)
    
  };

  return (
    <>

      <div className=" flex items-center justify-center  bg-slate-900 min-h-screen">
        <div className="relative w-full max-w-6xl md:h-[550px] h-[650px]  flex flex-col items-center justify-center">
        <BorderAnimatedContainer >
          <div className="flex items-center w-full h-full">

        <form
          className="flex flex-col space-y-4 p-6 items-center justify-center h-full w-full"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            className="custom-input"
            value={formdata.email}
            name="email"
            type="email"
            placeholder="enter email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className="custom-input"
            value={formdata.password}
            name="password"
            type="password"
            placeholder="enter password"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <button className="btn btn-accent border-1 text-teal-200 font-bold bg-teal-800 ">{loading?"loading":"login"}</button>
          <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="mt-2 text-teal-700 underline font-bold"> SignUp</Link>
          </p>
        </form>
        <div className=" flex flex-col h-full md:items-center justify-center items-center  pr-20">
          <img src="images/loginn.svg" alt="Login bg" className=""/>
        </div>
        </div>
        </BorderAnimatedContainer>
        
        </div>
      </div>
    </>
  );
};

export default Login;
