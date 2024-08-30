import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { z } from "zod";

import type { FormProps } from "antd";
import { App, Button, Form, Input } from "antd";
import { useUserLogin } from "../api/auth";
import { ILogin } from "../types/login.schema";

const FALLBACK = "/dashboard";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || FALLBACK });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const { message } = App.useApp();
  const { mutate: loginUserMutation, isPending } = useUserLogin();
  const router = useRouter();

  const onFinish: FormProps<ILogin>["onFinish"] = (values) => {
    loginUserMutation(values, {
      onSuccess() {
        message.success("welcome");
        router.invalidate();
        location.reload();
      },
      onError(err) {
        const errorMessage = err.message;
        message.error(errorMessage);
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Form
        className="rounded-lg w-full items-center shadow-lg bg-white p-6 pt-12"
        layout="vertical"
        name="basic"
        style={{ maxWidth: 350 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1 className=" text-lg text-primary font-bold mb-6">Login</h1>
        <Form.Item<ILogin>
          label="Email"
          name="login_id"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ILogin>
          label="Password"
          name="login_password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full"
            loading={isPending}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
