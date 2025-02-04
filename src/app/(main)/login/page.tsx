"use client";
import { useState } from "react";
import Input from "@/components/input/Input";
import { Button } from "@mui/joy";
import { login } from "@/db";
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
    const result = await login(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      setDisabled(false);
    } else {
      router.replace("/dashboard");
      toast.success("Logged in successfully.");
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
        <Input
          placeholder="username..."
          label="Username"
          type="text"
          name="username"
          aria-label="Username"
        />
        <Input
          placeholder="password..."
          label="Password"
          type="password"
          name="password"
          aria-label="Password"
        />
        <div className="w-full">
          <Button
            size="lg"
            loading={loading}
            disabled={disabled}
            className="w-full"
            type="submit"
          >
            Login
          </Button>
        </div>
        <div className="text-cyan-600 font-bold text-xl">
          Doesn&apos;t have an account yet,{" "}
          <a href="/signup" className="underline hover:text-cyan-700">
            create one
          </a>
        </div>
      </div>
    </form>
  );
}
