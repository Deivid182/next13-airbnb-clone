"use client";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((res) => {
      setIsLoading(false);
      if (res?.ok) {
        toast.success("Successfully logged in");
        router.refresh();
        loginModal.onClose();
      }
      if (res?.error) {
        toast.error(res.error);
      }
    });
  };

  const handleToggle = useCallback(() => {
    registerModal.onOpen();
    loginModal.onClose();
  
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log In to your account" />
      <Input
        id="email"
        label="Email"
        register={register}
        disabled={isLoading}
        errors={errors}
        type="email"
        required
      />
      <Input
        id="password"
        label="Password"
        register={register}
        disabled={isLoading}
        errors={errors}
        type="password"
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Login with Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Login with Github"
        onClick={() => signIn("github")}
        icon={AiOutlineGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div>First time using Airbnb?</div>
          <div
            onClick={handleToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Sign Up here
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log In"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
