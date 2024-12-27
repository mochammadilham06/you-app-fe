"use client";

import { Button, LoadingOverlay, Modal, Header } from "@youapp/components";
import { ModalProps, useModal } from "@youapp/hooks";
import { UserService } from "@youapp/services";
import { UserProfileProps } from "@youapp/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function InterestPage() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileProps>();

  const { getProfile, createProfile, updateProfile } = UserService();
  const [modalProps, showModal] = useModal<ModalProps>();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleGetProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      const { data } = res;
      const sanitizedInterest = data?.interests?.filter(
        (interest: string) => interest.trim() !== ""
      );
      setProfile(data);
      setTags(sanitizedInterest || []);
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
    handleGetProfile();
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    const { zodiac, horoscope, username, email, ...rest } =
      profile as UserProfileProps;
    const body = {
      ...rest,
      interests: tags,
    };

    try {
      const res = !profile
        ? await createProfile(body)
        : await updateProfile(body);
      if (res) {
        showModal({
          variant: "success",
          title: "Success",
          description: "Data has been saved successfully",
          onClose: () => router.push("/"),
        });
      }
    } catch (error: any) {
      console.log({ error });
      showModal({
        variant: "error",
        title: "Failed",
        description: error?.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title=""
        onCustomAction={
          <Button
            value="Save"
            variant="link-primary"
            onClick={onSubmit}
            disabled={tags?.length === 0}
          />
        }
      />

      <section className="space-y-3 mt-10">
        <h2 className="font-bold bg-gold-gradient bg-clip-text text-transparent text-lg">
          Tell everyone about yourself
        </h2>

        <h1 className="font-bold text-2xl">What interest you?</h1>
      </section>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 p-4 bg-[#D9D9D90F] rounded-lg mt-5">
        {tags?.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-[#FFFFFF1A] text-white px-3 py-1 rounded-lg"
          >
            <span className="mr-2">{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-white hover:text-red-500 focus:outline-none"
            >
              ✕
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag}
          className="flex-grow bg-transparent border-none text-white outline-none focus:ring-0"
        />
      </div>
      <Modal {...modalProps} />
      <LoadingOverlay variant="overlay" isShow={loading} />
    </>
  );
}
