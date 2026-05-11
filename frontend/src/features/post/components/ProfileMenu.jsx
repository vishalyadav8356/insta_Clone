import React, { useState } from "react";
import { RiAccountCircleLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ handleLogout }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => setOpenMenu(true)}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
      >
        <RiAccountCircleLine size={24} />
      </button>

      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div
              onClick={() => setOpenMenu(false)}
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed bottom-0 left-1/2 w-full max-w-100.5 -translate-x-1/2 bg-zinc-900 rounded-t-3xl p-6 z-50 shadow-2xl"
            >
              <div className="w-14 h-1 bg-zinc-600 rounded-full mx-auto mb-6"></div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpenMenu(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition"
                >
                  Login Another Account
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpenMenu(false);
                    navigate("/login");
                  }}
                  className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
                >
                  Logout
                 
                </button>

                <button
                  onClick={() => setOpenMenu(false)}
                  className="w-full py-4 rounded-2xl bg-zinc-700 hover:bg-zinc-600 text-white font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileMenu;
