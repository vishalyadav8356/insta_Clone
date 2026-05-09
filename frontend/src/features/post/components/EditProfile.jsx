import React, { useRef, useState } from "react";
import { usePost } from "../hook/usePost.js";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftFill } from "@remixicon/react";

const EditProfile = () => {


    const {handleEditProfile, loading} = usePost();

    const navigate = useNavigate();


    const BIO_MAX = 50;
    
    const [bio, setBio] = useState("");
    const [fileName, setFileName] = useState("");
    const  profileImage = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const file = profileImage.current.files[0];

        await handleEditProfile(bio, file);
        navigate("/profile");
    }

      if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-[420px] flex flex-col gap-4 px-4">
                <div className="w-full relative flex items-center justify-center">
                <button
                    onClick={() => navigate("/Profile")}
                    className="text-2xl text-white absolute top-3 left-4"
                >
                    <RiArrowLeftFill />
                </button>

                <h1 className="text-white text-2xl font-bold text-center mt-2">Edit Profile</h1>
            </div>
   

            {/* Form for editing profile */}
            <form className="flex flex-col gap-4"
                onSubmit={handleSubmit}>

                {/* Profile image input */}
                <label  htmlFor="postImage" className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold cursor-pointer flex items-center justify-between">
                    <span className="text-sm text-gray-500">{fileName || "Update Profile Image"}</span>
                </label>

                <input
                    ref={profileImage}
                    type="file"
                    id="postImage"
                    hidden
                    onChange={() => {
                        const f = profileImage.current?.files?.[0];
                        setFileName(f ? f.name : "");
                    }}
                />

                {/* Bio input */}
                <input
                    value={bio}
                    maxLength={BIO_MAX}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none"
                    type="text"
                    placeholder="Write a Bio..."/>

                <div className="text-xs text-gray-400 text-right">{bio.length}/{BIO_MAX}</div>

                {/* Save changes button */}
                <button
                    className="w-full px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition" type="submit">
                    Save Changes 
                </button>
            </form>
        </div>
        </main>
    );
};

export default EditProfile;
