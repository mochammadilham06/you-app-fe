"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  Button,
  Select,
  LoadingOverlay,
  Modal,
  Header,
} from "@youapp/components";
import PopoverComponent from "@youapp/components/popover";
import { useAuth } from "@youapp/configs/context/auth";
import { ProfileSchema } from "@youapp/constant";
import HeaderProfile from "@youapp/containers/profile/partials/completed-about";
import FormAbout from "@youapp/containers/profile/partials/form";
import InterestContainer from "@youapp/containers/profile/partials/interest";
import { ModalProps, useModal } from "@youapp/hooks/use-modal";
import { UserService } from "@youapp/services";
import { UserProfileProps } from "@youapp/types";
import { getYears } from "@youapp/utils/age-counter";
import { getHoroscope, getZodiac } from "@youapp/utils/get-zodiac";
import dayjs from "dayjs";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiEdit, FiPlus } from "react-icons/fi";

export default function Page() {
  //custom hooks
  const { getProfile, createProfile, updateProfile } = UserService();
  const { logout } = useAuth();

  //state
  const [loading, setLoading] = useState<boolean>(false);
  const [editAbout, setEditAbout] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [gender, setGender] = useState<{
    label: string;
    value: string;
  } | null>();
  const [modalProps, showModal] = useModal<ModalProps>();
  const [profile, setProfile] = useState<UserProfileProps | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm({
    defaultValues: {
      defaultImage: image || "",
      defaultGender: gender || null,
      name: profile?.name || "",
      birthday: profile?.birthday || "",
      height: profile?.height || 0,
      weight: profile?.weight || 0,
      horoscope: profile?.horoscope || "",
      zodiac: profile?.zodiac || "",
      interest: profile?.interests || [],
    },
    resolver: yupResolver(ProfileSchema),
  });

  //function
  const handleGetProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      console.log({ res });
      setProfile(res?.data);
    } catch (error: any) {
      showModal({
        title: "Failed get Data",
        description: error?.message || "Internal Server Error",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const image = localStorage.getItem("image_url");
      const gender = localStorage.getItem("gender");
      if (image) {
        setImage(image);
        setValue("defaultImage", image);
      }
      if (gender) {
        setGender(JSON.parse(gender || "{}"));
        setValue("defaultGender", JSON.parse(gender || "{}"));
      }
    }
    handleGetProfile();
  }, [handleGetProfile]);

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("birthday", profile.birthday || "");
      setValue("height", profile.height || 0);
      setValue("weight", profile.weight || 0);
      setValue("horoscope", profile.horoscope || "");
      setValue("zodiac", profile.zodiac || "");
    }
  }, [profile, setValue]);

  const onSubmit = async (data: any) => {
    const { horoscope, zodiac, defaultImage, defaultGender, ...rest } = data;
    setLoading(true);
    try {
      const res = !profile
        ? await createProfile(rest)
        : await updateProfile(rest);
      showModal({
        variant: "success",
        title: "Success",
        description: "Data has been saved successfully",
        onClose() {
          location.reload();
        },
      });
      if (res) {
        localStorage.setItem("gender", JSON.stringify(defaultGender));
        localStorage.setItem("image_url", defaultImage);
      }
    } catch (error) {
      console.log({ error });
      showModal({
        variant: "error",
        title: "Failed",
        description: "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header
        title="@youapp"
        onCustomAction={
          !editAbout && (
            <PopoverComponent
              items={[
                <Button
                  variant="link-primary"
                  value="Logout"
                  onClick={logout}
                />,
              ]}
            />
          )
        }
      />
      {/* When about is filled */}
      <HeaderProfile gender={gender} image={image} profile={profile} />

      <FormAbout
        control={control}
        editAbout={editAbout}
        handleSubmit={handleSubmit(onSubmit)}
        profile={profile}
        setEditAbout={setEditAbout}
        setValue={setValue}
        watch={watch}
      />

      <InterestContainer />

      <Modal {...modalProps} />
      <LoadingOverlay variant="overlay" isShow={loading} />
    </>
  );
}
