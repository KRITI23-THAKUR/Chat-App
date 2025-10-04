import { useContext, useState } from "react";
import useApi from "../hooks/useApi";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { AuthContext } from "../context/AuthContext";
import { setToken } from "../lib/localstorage";

const SignUp = () => {
  
  const { auth, setAuth } = useContext(AuthContext);
  const { request, loading } = useApi();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await request({
      endPoint: "/auth/register",
      method: "POST",
      body: formdata,
    });
    console.log(response)
    setAuth({
      token:response.token,
      user:response.user
    });
    setToken(response.token)
    

  };
  return (
    <>
      <div className=" w-full  flex items-center justify-center p-4 bg-slate-900 min-h-screen">
        <div className="relative w-full max-w-6xl md:h-[550px] h-[650px]  flex flex-col items-center justify-center">
          <BorderAnimatedContainer>
            <div className="flex  items-center w-full h-full">
              <form
                className="flex flex-col space-y-4 p-6 items-center justify-center h-full w-full "
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <input
                  className="custom-input"
                  value={formdata.name}
                  name="name"
                  type="text"
                  placeholder="Enter your Username"
                  onChange={handleChange}
                />
                <input
                  className="custom-input"
                  value={formdata.email}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                <input
                  className="custom-input"
                  value={formdata.password}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                <button className="btn btn-accent border-1 text-teal-200 border-teal-800">
                  {loading ? "SigningUp" : "SignUp"}
                </button>
              </form>
              <div className="w-full text-center">
                <h2>chaataa maardungi</h2>
              </div>
            </div>
          </BorderAnimatedContainer>
        </div>
      </div>
    </>
  );
};

export default SignUp;
