"use client";
import { useState } from "react";
import Input from "@/components/input/Input";
import Form from "next/form";
import { Button } from "@mui/joy";

async function formSubmit(formData: FormData) {
  "use server";
  const data = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmpassword: formData.get("confirmpassword"),
  };
  console.log("Form Data:", data);
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <Form
      className="flex flex-col items-center justify-center w-full min-h-screen gap-4"
      action={formSubmit}
    >
      <div className="w-96 flex flex-col gap-6">
        <div className="flex flex-row justify-between w-full gap-4">
          <Input
            placeholder="first name..."
            label="First Name"
            type="text"
            name="firstname"
          />
          <Input
            placeholder="last name..."
            label="Last Name"
            type="text"
            name="lastname"
          />
        </div>
        <Input
          placeholder="username..."
          label="Username"
          type="text"
          name="username"
        />
        <Input
          placeholder="password..."
          label="Password"
          type="password"
          name="password"
        />
        <Input
          placeholder="password..."
          label="Confirm Password"
          type="password"
          name="confirmpassword"
        />
      </div>
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
    </Form>
  );
}
