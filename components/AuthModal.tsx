"use client";

import { useEffect } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import Modal from "./Modal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, view, closeModal, openModal } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      closeModal();
    }
  }, [router, session, closeModal]);

  const getTitle = () => {
    switch (view) {
      case "sign_in":
        return "Welcome Back!";
      case "sign_up":
        return "Create an Account";
      case "forgotten_password":
        return "Reset Your Password";
      default:
        return "";
    }
  };

  const getDescription = () => {
    switch (view) {
      case "sign_in":
        return "Login to your account";
      case "sign_up":
        return "Sign up for a new account";
      case "forgotten_password":
        return "Enter your email to reset your password";
      default:
        return "";
    }
  };

  return (
    <Modal
      title={getTitle()}
      description={getDescription()}
      isOpen={isOpen}
      onChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <Auth
        showLinks={false}
        supabaseClient={supabaseClient}
        view={view}
        theme="dark"
        providers={["github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: "#404040", brandAccent: "#22c55e" } },
          },
        }}
      />
      {view !== "forgotten_password" && (
        <div style={{ marginTop: "20px" }}>
          {view === "sign_in" && (
            <>
              <p style={{ marginBottom: "10px" }}>
                Don&apos;t have an account?{" "}
                <a
                  onClick={() => openModal("sign_up")}
                  style={{ cursor: "pointer", color: "#22c55e" }}
                >
                  Sign up here
                </a>
              </p>
              <p>
                Forgot your password?{" "}
                <a
                  onClick={() => openModal("forgotten_password")}
                  style={{ cursor: "pointer", color: "#22c55e" }}
                >
                  Reset it here
                </a>
              </p>
            </>
          )}
          {view === "sign_up" && (
            <p>
              Already have an account?{" "}
              <a
                onClick={() => openModal("sign_in")}
                style={{ cursor: "pointer", color: "#22c55e" }}
              >
                Log in here
              </a>
            </p>
          )}
        </div>
      )}
      {view === "forgotten_password" && (
        <p>
          Remembered your password?{" "}
          <a
            onClick={() => openModal("sign_in")}
            style={{ cursor: "pointer", color: "#22c55e" }}
          >
            Log in here
          </a>
        </p>
      )}
    </Modal>
  );
};

export default AuthModal;
