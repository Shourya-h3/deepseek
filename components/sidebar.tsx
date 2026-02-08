import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets.js';
import { UserButton, useClerk } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';



interface SidebarProps {
  expand: boolean;
  setExpand: (expand: boolean) => void;
}

const Sidebar = ({ expand, setExpand }: SidebarProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const {openSignIn} = useClerk()
  const {user} = useAppContext()

  return (
    <div
      style={{
        backgroundColor: '#3a3d44',
        borderRightColor: '#3f424a',
        ...(expand ? {} : { width: '96px', minWidth: '96px', maxWidth: '96px' }),
      }}
      className={`flex flex-col justify-between pt-6 transition-all z-50 max-md:absolute max-md:h-screen border-r shrink-0 overflow-visible ${
        expand ? 'p-4 md:w-72 w-72' : ''
      }`}
    >
      <div onMouseLeave={() => setShowTooltip(false)}>
        <div className={`flex ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>
          <Image
            className={expand ? 'w-36' : 'w-12'}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt=""
          />
          <button
            type="button"
            onClick={() => setExpand(!expand)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={expand ? 'Close sidebar' : 'Open sidebar'}
            className="relative flex items-center justify-center hover:bg-gray-500/25 transition-all duration-200 h-12 w-12 aspect-square rounded-xl cursor-pointer"
          >
            <Image src={assets.menu_icon} alt="" className="md:hidden w-7" />
            <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt="" className="hidden md:block w-9" />
            {showTooltip && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '100%',
                  transform: 'translate(-50%, 8px)',
                  backgroundColor: '#000',
                  color: '#fff',
                  fontSize: '12px',
                  padding: '4px 10px',
                  borderRadius: '7px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.55)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
              >
                {expand ? 'Close sidebar' : 'Open sidebar'}
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '-5px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#000',
                    transform: 'translateX(-50%) rotate(45deg)',
                  }}
                />
              </div>
            )}
          </button>
        </div>
        {expand ? (
          <>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3b6ef3] px-4 py-2 text-sm font-medium text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)] hover:bg-[#335fe0] transition"
            >
              <Image src={assets.new_icon} alt="" className="h-4 w-4" />
              New chat
            </button>
            <div className="mt-6 text-white/40 text-sm">
              <p className="my-1">Recents</p>
              <div className="mt-2 flex flex-col gap-1">
                <ChatLabel />
              </div>
            </div>
          </>
        ) : (
          <div className="mt-6 w-full flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#2f3137] hover:bg-gray-500/25 transition"
              aria-label="New chat"
            >
              <Image src={assets.new_icon} alt="" className="h-6 w-6 opacity-90" style={{ display: 'block' }} />
            </button>
          </div>
        )}
      </div>

      <div>
        <div className={`flex items-center cursor-pointer group relative ${expand ?"gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10 cursor-pointer" : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"}`}>
          <Image className={expand ? "w-5" : "w-6.5 mx-auto"} src={expand ? assets.phone_icon : assets.phone_icon_dull} alt=''/>
          <div className={`absolute -top-60 pb-8 ${!expand && "-right-40"} opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}>
          <div className='relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg'>
            <Image src={assets.qrcode} alt='' className='w-44'/>
            <p>Scan to get DeepSeek App</p>
            <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand? "right-1/2" : "left-4"}-bottom-1.5`}></div>
          </div>
          </div>{expand && <> <span>Get App</span> <Image alt='' src={assets.new_icon}/></>}
        </div>
        <div
          onClick={user ? undefined : () => openSignIn()}
          className={`flex items-center ${expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'} gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}
        >
          {user ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          ) : (
            <Image src={assets.profile_icon} alt="" className="w-7" />
          )}
          {expand && (
            <span>
              {user?.primaryEmailAddress?.emailAddress ?? "My Profile"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
