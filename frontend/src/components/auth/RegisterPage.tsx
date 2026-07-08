"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Description,
  ErrorText,
  Field,
  Form,
  Hero,
  HeroContent,
  Input,
  Message,
  Page,
  RegisterCard,
  RegisterContent,
  RegisterHeading,
  SubmitButton,
  Title,
} from "./RegisterPage.styles";

const registerSchema = z
  .object({
    email: z.email("올바른 이메일을 입력해주세요."),
    name: z
      .string()
      .trim()
      .min(2, "이름은 2자 이상 입력해주세요.")
      .max(20, "이름은 20자 이하로 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상 입력해주세요.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "비밀번호는 영문과 숫자를 함께 포함해야 합니다.",
      ),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setMessage("");
    setHasError(false);

    const response = await fetch("/api/auth/register", {
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      setHasError(true);
      setMessage("회원가입 정보를 확인해주세요.");
      return;
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.ok) {
      setMessage("회원가입이 완료되었습니다.");
      router.push("/");
      router.refresh();
      return;
    }

    setMessage("회원가입이 완료되었습니다. 로그인해주세요.");
    router.push("/");
  };

  return (
    <Page>
      <Hero>
        <HeroContent>
          <Title>회원가입</Title>
          <Description>
            일기 기록을 안전하게 이어갈 수 있도록 계정을 만들어주세요.
          </Description>
        </HeroContent>
      </Hero>

      <RegisterCard>
        <RegisterContent>
          <RegisterHeading>계정 정보</RegisterHeading>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              이름
              <Input
                $invalid={Boolean(errors.name)}
                autoComplete="name"
                {...register("name")}
              />
              <ErrorText>{errors.name?.message}</ErrorText>
            </Field>

            <Field>
              이메일
              <Input
                $invalid={Boolean(errors.email)}
                autoComplete="email"
                type="email"
                {...register("email")}
              />
              <ErrorText>{errors.email?.message}</ErrorText>
            </Field>

            <Field>
              비밀번호
              <Input
                $invalid={Boolean(errors.password)}
                autoComplete="new-password"
                type="password"
                {...register("password")}
              />
              <ErrorText>{errors.password?.message}</ErrorText>
            </Field>

            <Field>
              비밀번호 확인
              <Input
                $invalid={Boolean(errors.passwordConfirm)}
                autoComplete="new-password"
                type="password"
                {...register("passwordConfirm")}
              />
              <ErrorText>{errors.passwordConfirm?.message}</ErrorText>
            </Field>

            <SubmitButton disabled={isSubmitting} type="submit">
              회원가입
            </SubmitButton>
            <Message $error={hasError}>{message}</Message>
          </Form>
        </RegisterContent>
      </RegisterCard>
    </Page>
  );
}

export default RegisterPage;
