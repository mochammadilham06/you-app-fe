import { Button } from "@youapp/components";
import { useRouter } from "next/navigation";
import React from "react";
import { FiEdit } from "react-icons/fi";

export default function InterestContainer() {
  const router = useRouter();

  return (
    <div className="w-full bg-[#0E191F] rounded-lg p-4 relative mt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-white">Interest</h2>
        <Button
          variant="link"
          Icon={FiEdit}
          onClick={() => router.push("/interest")}
        />
      </div>

      <p className="text-gray-400 mt-5">
        {"Add in your interest to find a better match"}
      </p>
    </div>
  );
}
