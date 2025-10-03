import { useState } from "react";
import useApi from "../hooks/useApi";

const INITIAL_FORMDATA = {
  email: "",
  password: "",
};

const Login = () => {
  const [formdata, setFormdata] = useState(INITIAL_FORMDATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const { request, loading } = useApi();

  const submitHandler = async (e) => {
    e.preventDefault(); 
   const data= await request({
      endPoint: "/auth/login",
      method: "POST",
      body: formdata,
      redirectUrl:"/"
    });
  };

  return (
    <>
      <div className=" flex items-center justify-center min-h-screen">
        <form
          className=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            className="input"
            value={formdata.email}
            name="email"
            type="email"
            placeholder="enter email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            className="input"
            value={formdata.password}
            name="password"
            type="password"
            placeholder="enter password"
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <button className="btn btn-ghost">{loading?"loading":"login"}</button>
        </form>
      </div>
    </>
  );
};

export default Login;
