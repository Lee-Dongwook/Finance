"use client";

import { useUser } from "@clerk/nextjs";

const Welcome = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        반갑습니다! {isLoaded ? ", " : " "}
        {user?.firstName} 👋🏻
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        금융 리포트를 확인하실 수 있습니다.
      </p>
    </div>
  );
};

export default Welcome;
