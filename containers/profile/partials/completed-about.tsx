import { horoscopeIcons, zodiacIcons } from "@youapp/constant";
import { UserProfileProps } from "@youapp/types";
import { getYears } from "@youapp/utils/age-counter";
import Image from "next/image";
import React from "react";

interface HeaderProfileProps {
  profile: UserProfileProps | null;
  image: string | null;
  gender: any;
}

export default function HeaderProfile({
  image,
  profile,
  gender,
}: HeaderProfileProps) {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg">
        {image ? (
          <Image
            src={image}
            alt="Profile Background"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#162329]"></div>
        )}

        <div className="absolute bottom-4 left-4">
          <h2 className="text-lg font-bold">
            @{profile?.name}, {profile?.birthday && getYears(profile?.birthday)}
          </h2>
          {gender && <p className="text-sm">{gender?.label}</p>}
          {profile?.horoscope && profile?.zodiac && (
            <div className="flex gap-2 mt-2">
              <span className="bg-[#FFFFFF0F] z-50 p-3 rounded-full">
                {
                  horoscopeIcons[
                    profile?.horoscope as keyof typeof horoscopeIcons
                  ]
                }{" "}
                {profile?.horoscope}
              </span>
              <span className="bg-[#FFFFFF0F] p-3 rounded-full">
                {zodiacIcons[profile?.zodiac as keyof typeof zodiacIcons]}{" "}
                {profile?.zodiac}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
