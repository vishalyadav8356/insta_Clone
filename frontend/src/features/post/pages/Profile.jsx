import React from 'react'


const Profile = () => {
  return (
 <main className="min-h-screen w-full max-w-[420px] mx-auto bg-gray-900 text-white p-4">

      {/* Top Section */}
      <div className="flex items-center gap-5">

        {/* Profile Image */}
        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-500">
          <img
            src="/placeholder.svg"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Username + Bio */}
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Username</h1>
          <p className="text-gray-400 text-sm mt-1">
            Bio goes here...
          </p>

          {/* Stats */}
          <div className="flex gap-4 mt-3 text-sm">
            <p><span className="font-semibold">0</span> posts</p>
            <p><span className="font-semibold">100</span> followers</p>
            <p><span className="font-semibold">150</span> following</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm">
              Edit Profile
            </button>
            <button className="flex-1 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm">
              Saved
            </button>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-6 border-t border-gray-700 pt-4">

        <div className="grid grid-cols-3 gap-1">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-700 rounded-sm"
            ></div>
          ))}
        </div>

      </div>
    </main>
  )
}

export default Profile