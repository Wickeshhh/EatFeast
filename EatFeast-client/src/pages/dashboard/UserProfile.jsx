import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL)
      .then(() => {
        // Profile updated!
        alert("Profile updated successfully");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  return (
    <div className="h-screen max-w-md mx-auto flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-lg rounded-lg bg-white p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Your Profile
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your name"
              className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-red focus:border-red"
              required
            />
          </div>

          {/* Photo Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600">Upload Photo</span>
            </label>
            <input
              type="file"
              {...register("photoURL")}
              className="file-input w-full mt-1 border border-gray-300 text-gray-600 focus:ring-2 focus:ring-red focus:border-red"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value={"Update"}
              className="btn w-full bg-red text-white hover:bg-[#B02A00] focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
