import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import type { FormProps } from "antd";
import { App, Button, Form, Input } from "antd";
import { z } from "zod";
import { useUserLogin } from "../api/auth";
import Logo from "../assets/full_logo.png";
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
        // simplify reponse
        message.error(errorMessage);
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Form
        className="rounded-lg w-full items-center shadow-lg bg-white p-6 pt-8"
        layout="vertical"
        name="basic"
        style={{ maxWidth: 350 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <img
          className="h-[40px]  mb-6 text-center w-full  object-contain"
          src={Logo}
          alt=""
        />
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
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
