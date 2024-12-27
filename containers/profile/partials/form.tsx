import { Button, Input, Select } from "@youapp/components";
import { UserProfileProps } from "@youapp/types";
import { getYears } from "@youapp/utils/age-counter";
import { getHoroscope, getZodiac } from "@youapp/utils/get-zodiac";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { FiEdit, FiPlus } from "react-icons/fi";

interface FormAboutProps {
  setValue: any;
  profile: UserProfileProps | null;
  editAbout: boolean;
  handleSubmit: any;
  watch: any;
  setEditAbout: any;
  control: Control | any;
}

export default function FormAbout({
  editAbout,
  handleSubmit,
  watch,
  setEditAbout,
  profile,
  setValue,
  control,
}: FormAboutProps) {
  return (
    <div className="w-full bg-[#0E191F] rounded-lg p-4 relative mt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-white">About</h2>
        {editAbout ? (
          <Button
            variant="link-primary"
            value="Save & Update"
            className="!bg-gold-gradient !bg-clip-text !text-transparent !border-none active:!border-none"
            onClick={handleSubmit}
            disabled={
              !watch("defaultImage") ||
              !watch("name") ||
              !watch("birthday") ||
              !watch("height") ||
              !watch("weight") ||
              !watch("horoscope") ||
              !watch("zodiac")
            }
          />
        ) : (
          <Button
            variant="link"
            Icon={FiEdit}
            onClick={() => setEditAbout(true)}
          />
        )}
      </div>

      {profile && !editAbout ? (
        <div className="space-y-4">
          <div className="flex items-center gap-x-3">
            <label className="whitespace-normal text-sm text-gray-400">
              Birthday:
            </label>
            <span>{`${dayjs(profile?.birthday).format(
              "DD/MM/YYYY"
            )} (Age ${getYears(profile?.birthday)})`}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <label
              htmlFor="gender"
              className="whitespace-normal text-sm  text-gray-400"
            >
              Horoscope:
            </label>
            <span>{profile?.horoscope}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <label className="whitespace-normal text-sm text-gray-400">
              Zodiac:
            </label>
            <span>{profile?.zodiac}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <label className="whitespace-normal text-sm text-gray-400">
              Height
            </label>
            <span>{profile?.height} cm</span>
          </div>
          <div className="flex items-center gap-x-3">
            <label className="whitespace-normal text-sm text-gray-400">
              Weight
            </label>
            <span>{profile?.weight} kg</span>
          </div>
        </div>
      ) : editAbout ? (
        <>
          <div className="flex items-center mb-4">
            <label
              htmlFor="image-upload"
              className="w-16 h-16 rounded-2xl bg-gray-700 flex items-center justify-center text-white overflow-hidden cursor-pointer"
            >
              {watch("defaultImage") ? (
                <div className="relative w-full h-full rounded-2xl">
                  <Image
                    src={watch("defaultImage")}
                    alt="Uploaded"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              ) : (
                <FiPlus size={30} color="#F3EDA6" />
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setValue("defaultImage", imageUrl);
                }
              }}
            />
            <span className="ml-4 text-white text-sm">Add image</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-x-3">
              <label
                htmlFor="name"
                className="w-2/3  whitespace-normal text-sm text-gray-400"
              >
                Display name:
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    name="name"
                    placeholder="Display Name"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={watch("name")}
                    rtl
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-x-3">
              <label
                htmlFor="gender"
                className="w-2/3 whitespace-normal text-sm pr-8 text-gray-400"
              >
                Gender:
              </label>

              <Select
                id="gender"
                onChange={(e) => setValue("defaultGender", e)}
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                ]}
                value={watch("defaultGender")?.value || ""}
                name="gender"
                rtl
              />
            </div>
            <div className="flex items-center gap-x-3">
              <label
                htmlFor="birthday"
                className="w-2/3  whitespace-normal text-sm text-gray-400"
              >
                Birth Day:
              </label>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                placeholder="Birthday"
                onChange={(e) => {
                  setValue("birthday", e.target.value);
                  setValue("horoscope", getHoroscope(e.target.value));
                  setValue("zodiac", getZodiac(e.target.value));
                }}
                value={watch("birthday")}
                rtl
              />
            </div>
            <div className="flex items-center gap-x-3">
              <label
                htmlFor="horoscope"
                className="w-2/3  whitespace-normal text-sm text-gray-400"
              >
                Horoscope
              </label>
              <Input
                id="horoscope"
                name="horoscope"
                disabled
                placeholder="Horoscope"
                value={watch("horoscope")}
                rtl
              />
            </div>
            <div className="flex items-center gap-x-3">
              <label
                htmlFor="zodiac"
                className="w-2/3  whitespace-normal text-sm text-gray-400"
              >
                zodiac
              </label>
              <Input
                id="zodiac"
                name="zodiac"
                disabled
                placeholder="Zodiac"
                value={watch("zodiac")}
                rtl
              />
            </div>
            <div className="flex items-center gap-x-3">
              <label
                htmlFor="height"
                className="w-2/3  whitespace-normal text-sm text-gray-400"
              >
                Height:
              </label>
              <Input
                id="height"
                name="height"
                type="number"
                placeholder="Height"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,3}$/.test(value)) {
                    setValue("height", Number(value));
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "+" ||
                    e.key === "-"
                  ) {
                    e.preventDefault();
                  }
                }}
                value={watch("height")}
                rtl
              />
            </div>
            <div className="flex items-center gap-x-3">
              <label
                htmlFor="weight"
                className="w-2/3 whitespace-normal text-sm text-gray-400"
              >
                Weight:
              </label>
              <Input
                id="weight"
                name="name"
                type="number"
                placeholder="Weight"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,3}$/.test(value)) {
                    setValue("weight", Number(value));
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "+" ||
                    e.key === "-"
                  ) {
                    e.preventDefault();
                  }
                }}
                value={watch("weight")}
                rtl
              />
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-400 mt-5">
          {"Add in your your to help others know you better"}
        </p>
      )}
    </div>
  );
}
