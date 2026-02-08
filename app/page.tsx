'use client';
import { useState } from 'react';
import Sidebar from "@/components/sidebar";
import Image from 'next/image';
import { assets } from "@/assets/assets.js";
import PromptBox from '@/components/PromptBox';
import Message from '@/components/Message';

export default function Home() {

  const [expand, setExpand] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages] = useState<unknown[]>([]);
  return (
    <div className="min-h-screen">
      <div className="flex h-screen overflow-visible">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt=""
            />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>

          {messages.length === 0 ? (
            <div className="-mt-6 flex flex-col items-center text-center gap-2">
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="" className="h-7 w-7" />
                <p className="text-xl font-medium">Hi, I&apos;m DeepSeek.</p>
              </div>
              <p className="text-sm text-white/80">How can I help you today?</p>
            </div>
          ) : (
            <div>
              <Message role='user' content='What is next js'/>
            </div>
          )}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

          <p className="text-xs absolute bottom-3 text-white/50">
            AI-generated, for reference only
          </p>

        </div>
      </div>
    </div>
  );
}
