import Image from "next/image";
import Link from "next/link";

import Buble from "@/components/svg/buble";
import TaskSvg from "@/components/svg/task";
import { Button } from "@/components/ui/button";
const HomeHeroSection = () => {
  return (
    <view className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full flex flex-col justify-center items-center relative">
        <Image alt="ava1" src="/avatars/ava1.svg" width={300} height={300} />
        <div className="absolute z-[-1] -translate-y-20">
          <Buble />
        </div>
        <div className="absolute z-[-1] scale-120 ">
          <TaskSvg />
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col mt-17 space-y-5">
        <h1 className="text-3xl font-bold text-center max-w-78">
          Task Management & To-Do List
        </h1>
        <p className="text-foreground/500 text-md text-center max-w-80">
          This productive tool is designed to help you better manage your task
          project-wise conveniently!
        </p>
        <Link href="/login" className="w-full flex justify-center">
          <Button className="w-full max-w-sm text-4xl rounded-2xl h-auto ">
            Let&apos;s Start
          </Button>
        </Link>
      </div>
    </view>
  );
};

export default HomeHeroSection;
