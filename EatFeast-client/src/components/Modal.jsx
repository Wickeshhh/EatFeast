import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Modal = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // modal close button
  const [isModalOpen, setIsModalOpen] = useState(true); 
  const closeModal = () => {
    setIsModalOpen(false);
    document.getElementById("my_modal_5").close()
  };

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;

        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
      }
      axiosPublic.post('/users', userInfo)
      .then(res =>{
          console.log(res.data);
        
      })
        // console.log(user);
        alert("Login successful!");
        navigate("/");
        console.log("Modal Open:", isModalOpen);
        closeModal(); 
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
      reset()

  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
        closeModal();
      });
    });
  };

  return (
    <dialog id="my_modal_5" className={`modal ${isModalOpen ? 'modal-middle sm:modal-middle' : 'hidden'}`}>
      <div className="modal-box">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please login to continue!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Please provide the correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-red text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>

            <p className="text-start my-2">
              New here?
              <Link to="/signup" className="underline text-red ml-1">
                Sign Up
              </Link>
            </p>
          </form>

          {/* socials  */}
          <div className="text-center space-x-3 mb-5">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-[#4285f4] hover:text-white"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-[#0165E1] hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-[#333] hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
