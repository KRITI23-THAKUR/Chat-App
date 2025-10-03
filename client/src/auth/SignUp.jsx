import React from "react";
import { useState } from "react";
import Header from "../components/Header";

const FORMDATA = {
    name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formdata, setFormdata] = useState(FORMDATA);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setFormdata(FORMDATA);
    }
  };

  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen">
        <form
          className="flex flex-col space-y-4"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            value={formdata.name}
            name="name"
            type="text"
            placeholder="Enter your Username"
            onChange={handleChange}
          />
          <input
            value={formdata.email}
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            value={formdata.password}
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button>SignUp</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
