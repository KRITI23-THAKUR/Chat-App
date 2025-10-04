import { useContext, useState } from "react";
import useApi from "../hooks/useApi";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { AuthContext } from "../context/AuthContext";
import { setToken } from "../lib/localstorage";

const INITIAL_FORMDATA = {
  email: "",
  password: "",
};

const Login = () => {
  const{auth,setAuth}=useContext(AuthContext)
  
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
    setAuth({
     token: response.token,
     user: response.user
    })
    setToken(response.token)
  };

  return (
    <>
      <div className=" flex items-center justify-center min-h-screen bg-slate-900 min-h-screen">
        <div className="relative w-full max-w-6xl md:h-[550px] h-[650px]  flex flex-col items-center justify-center">
        <BorderAnimatedContainer >
          <div className="flex  items-center w-full h-full">
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
        </form>
        <div className=" w-full text-center text-white">
          tu batmiz h
        </div>
        </div>
        </BorderAnimatedContainer>
        
        </div>
      </div>
    </>
  );
};

export default Login;
