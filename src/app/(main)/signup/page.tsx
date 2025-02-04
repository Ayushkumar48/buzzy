"use client";
import { useState } from "react";
import Input from "@/components/input/Input";
import { Button } from "@mui/joy";
import { signup } from "@/db";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setDisabled(true);

    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      setDisabled(false);
    } else {
      router.replace("/dashboard");
      toast.success("Account created successfully.");
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full min-h-screen gap-4 bg-[url('/svgs/background.svg')]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6 p-8 bg-[url('/svgs/card.svg')] w-[450px] rounded-lg">
        <h1 className="text-4xl font-bold text-slate-800">
          Login to your account
        </h1>
        <div className="flex flex-row justify-between w-full gap-4">
          <Input
            placeholder="First name..."
            label="First Name"
            type="text"
            name="firstname"
            aria-label="First Name"
          />
          <Input
            placeholder="Last name..."
            label="Last Name"
            type="text"
            name="lastname"
            aria-label="Last Name"
          />
        </div>
        <Input
          placeholder="Username..."
          label="Username"
          type="text"
          name="username"
          aria-label="Username"
        />
        <Input
          placeholder="Password..."
          label="Password"
          type="password"
          name="password"
          aria-label="Password"
        />
        <Input
          placeholder="Confirm Password..."
          label="Confirm Password"
          type="password"
          name="confirmpassword"
          aria-label="Confirm Password"
        />
        <div className="w-96">
          <Button
            size="lg"
            loading={loading}
            disabled={disabled}
            className="w-full"
            type="submit"
          >
            Create Account
          </Button>
        </div>
        <div className="text-cyan-600 font-bold text-xl">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-cyan-700">
            Click here
          </a>{" "}
          to login
        </div>
      </div>
    </form>
  );
}
