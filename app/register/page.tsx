"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, Modal, Header } from "@youapp/components";
import { useAuth } from "@youapp/configs/context/auth";
import { AuthSchema, RegisterInitialState } from "@youapp/constant";
import { ModalProps, useModal } from "@youapp/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function Register() {
  //service
  const { register, loading } = useAuth();

  //state
  const [modalProps, showModal, hideModal] = useModal<ModalProps>();

  //hooks
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof RegisterInitialState>({
    defaultValues: RegisterInitialState,
    // @ts-ignore
    resolver: yupResolver(AuthSchema(true)),
    mode: "onChange",
  });

  const onSubmit = async (data: typeof RegisterInitialState) => {
    const { confirmPassword, ...rest } = data;
    try {
      const res = await register(rest);
      showModal({
        title: "Success Register",
        description: "Register has been successfully",
        variant: "success",
        onClose: () => {
          hideModal();
          router.push("/login");
        },
      });
    } catch (error: any) {
      showModal({
        title: "Error Register",
        description: error?.message || "Internal Server Error",
        variant: "error",
        onClose: () => hideModal(),
      });
    }
  };
  return (
    <>
      <Header title="" />
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-6 w-full md:max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 pl-5">Register</h2>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  name="email"
                  placeholder="Enter Email"
                  onChange={(e) => field.onChange(e.target.value)}
                  type="email"
                  value={field.value}
                  className="w-full"
                  variant={errors?.email ? "danger" : "normal"}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  className="w-full"
                  name="username"
                  placeholder="Enter Username"
                  onChange={(e) => {
                    const val = e.target.value;
                    const sanitized = /^[-@.,_%/&\w\s]*$/;
                    if (sanitized.test(val)) field.onChange(val);
                  }}
                  type="text"
                  value={field.value}
                  variant={errors?.username ? "danger" : "normal"}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  className="w-full"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  variant={errors?.password ? "danger" : "normal"}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />
          {/* @ts-ignore */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  className="w-full"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter Confirm Password"
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  variant={errors?.password ? "danger" : "normal"}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            variant="primary"
            type="submit"
            value="Register"
            isLoading={loading}
          />

          <p className="text-center text-gray-400 mt-6">
            Have an Account ?
            <span
              onClick={() => router.push("/login")}
              className="text-yellow-200 hover:text-yellow-100 hover:cursor-pointer"
            >
              Login Here
            </span>
          </p>
        </div>
      </form>

      <Modal {...modalProps} />
    </>
  );
}
