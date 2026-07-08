"use client";

import { Avatar } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import AppModal from "@/src/components/common/AppModal";
import { socialAuthProviders } from "@/src/data/authProviders";
import {
  AccountBox,
  AccountEmail,
  AccountName,
  ActionRow,
  AuthContent,
  Field,
  FieldInput,
  Form,
  HelpText,
  Message,
  SocialButton,
  SocialButtonGroup,
  SubmitButton,
} from "./AuthModal.styles";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

function SocialButtons() {
  return (
    <SocialButtonGroup>
      {socialAuthProviders.map((provider) => {
        const Icon = provider.icon;

        return (
          <SocialButton
            key={provider.id}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            type="button"
          >
            <Icon aria-hidden="true" />
            Sign in with {provider.label}
          </SocialButton>
        );
      })}
    </SocialButtonGroup>
  );
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCredentials = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    return { email, password };
  };

  const handleCredentialsLogin = async (form: HTMLFormElement) => {
    const { email, password } = getCredentials(form);
    setIsSubmitting(true);
    setMessage("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.ok) {
      setHasError(false);
      setMessage("로그인되었습니다.");
      onClose();
      return;
    }

    setHasError(true);
    setMessage("아이디 또는 비밀번호를 확인해주세요.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleCredentialsLogin(event.currentTarget);
  };

  return (
    <AppModal
      onCancel={onClose}
      open={open}
      title={session ? "내 계정" : "로그인"}
    >
      {session ? (
        <AuthContent>
          <AccountBox>
            <Avatar size={64} src={session.user?.image}>
              {session.user?.name?.[0] ?? session.user?.email?.[0]}
            </Avatar>
            <AccountName>{session.user?.name ?? "사용자"}</AccountName>
            {session.user?.email ? (
              <AccountEmail>{session.user.email}</AccountEmail>
            ) : null}
          </AccountBox>
          <SubmitButton onClick={() => signOut({ callbackUrl: "/" })} type="button">
            로그아웃
          </SubmitButton>
        </AuthContent>
      ) : (
        <AuthContent>
          <Form onSubmit={handleSubmit}>
            <Field>
              <FieldInput
                name="email"
                placeholder="이메일"
                required
                type="email"
              />
            </Field>
            <Field>
              <FieldInput
                name="password"
                placeholder="비밀번호"
                required
                type="password"
              />
            </Field>
            <ActionRow>
              <SubmitButton disabled={isSubmitting} type="submit">
                로그인
              </SubmitButton>
              <SubmitButton
                $variant="secondary"
                disabled={isSubmitting}
                onClick={() => {
                  onClose();
                  router.push("/register");
                }}
                type="button"
              >
                회원가입
              </SubmitButton>
            </ActionRow>
            <HelpText type="button">아이디 또는 비밀번호를 잊으셨나요?</HelpText>
            <Message $error={hasError}>{message}</Message>
          </Form>
          <SocialButtons />
        </AuthContent>
      )}
    </AppModal>
  );
}

export default AuthModal;
