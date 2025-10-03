import React from "react";
import { useState } from "react";
import Header from "../components/Header";

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

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(formdata);
    



try{
    const  request=await fetch("http://localhost:8000/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formdata)

    });
    console.log(await request.json());
    
    
}
    catch(error){
        console.log("api error:"+error.message)
    }
  };

  return (

  <>
  <Header/>
  <div className=" flex items-center justify-center min-h-screen">
      <form className=""
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          value={formdata.email}
          name="email"
          type="email"
          placeholder="enter email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          value={formdata.password}
          name="password"
          type="password"
          placeholder="enter password"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <button>Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;

  