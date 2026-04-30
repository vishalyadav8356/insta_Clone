import React from 'react'
import {useNavigate} from 'react-router-dom'

const Nav = () => {

    const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-center py-2">
        <p className="text-white font-bold text-xl">InstaClone</p>
         {/* <button 
            onClick={() => navigate('/create-post')}
         className='px-4 py-2  rounded-full bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-600 transition-transform duration-150 ease-in-out active:scale-95'>Create Post</button> */}
    </nav> 
  )
}

export default Nav