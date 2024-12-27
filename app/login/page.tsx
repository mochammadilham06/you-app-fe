"use client";
import { Input, Button, Modal } from "@youapp/components";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthInitialState, AuthSchema } from "@youapp/constant";
import { ModalProps, useModal } from "@youapp/hooks";
import { useAuth } from "@youapp/configs/context/auth";
import { isEmpty } from "lodash";

export default function Login() {
  //hooks
  const [modalProps, showModal, hideModal] = useModal<ModalProps>();
  const { login, loading } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: AuthInitialState,
    resolver: yupResolver(AuthSchema(false)),
    mode: "onChange",
  });

  //function
  const onSubmit = async (data: any) => {
    try {
      const res = await login(data);
      console.log({ res });
    } catch (error: any) {
      console.log({ error });
      showModal({
        title: "Error Login",
        description: error?.message || "Internal Server Error",
        variant: "error",
        onClose: () => hideModal(),
      });
    }
  };

  return (
    <form
      className="flex w-full justify-center items-center min-h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6 w-full">
        <h2 className="text-2xl font-bold text-white mb-6 pl-5">Login</h2>

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

        <Button
          variant="primary"
          value="Login"
          type="submit"
          isLoading={loading}
          disabled={loading || !isEmpty(errors)}
        />

        <p className="text-center text-gray-400 mt-6">
          No account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-yellow-200 hover:text-yellow-100 hover:cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
      <Modal {...modalProps} />
    </form>
  );
}
