import { useState } from "react";
import useApi from "../hooks/useApi";

const FORMDATA = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const { request, loading } = useApi();
  const [formdata, setFormdata] = useState(FORMDATA);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await request({
      endPoint: "/auth/register",
      method: "POST",
      body: formdata,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="flex flex-col space-y-4"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            className="input"
            value={formdata.name}
            name="name"
            type="text"
            placeholder="Enter your Username"
            onChange={handleChange}
          />
          <input
            className="input"
            value={formdata.email}
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            className="input"
            value={formdata.password}
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button className="btn">{loading?"SigningUp":"SignUp"}</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
