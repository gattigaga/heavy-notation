"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import Image from "next/image";
import { Trans, useLingui } from "@lingui/react/macro";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSignInSchema } from "../validations";
import { signIn } from "../actions";
import Spinner from "./Spinner";
import { signInWithOAuth } from "@/app/(protected)/actions";
import imgLogoGoogle from "../../../public/images/logo-google.png";

type Props = {
  lang: string;
};

const SignInForm = ({ lang }: Props) => {
  const { t, i18n } = useLingui();
  const signInAction = useAction(signIn);

  const signInSchema = getSignInSchema(i18n);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Show error from server action if any.
  useEffect(() => {
    if (signInAction.hasErrored) {
      // Handle validation errors.
      if (signInAction.result.validationErrors) {
        const validation = signInAction.result.validationErrors;

        if (validation._errors) {
          toast.error(validation._errors?.[0]);
        }

        if (validation.email) {
          form.setError("email", {
            type: "manual",
            message: validation.email._errors?.[0],
          });
        }

        if (validation.password) {
          form.setError("password", {
            type: "manual",
            message: validation.password._errors?.[0],
          });
        }
      }

      // Handle server error.
      if (signInAction.result.serverError) {
        toast.error(t`Server can't process your request.`);
      }

      signInAction.reset();
    }
  }, [signInAction.hasErrored, signInAction.result.validationErrors, form]);

  return (
    <main>
      {!signInAction.isPending && (
        <div className="flex flex-col items-center px-6 py-24">
          <div className="min-w-80 max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-700 dark:text-white">
              Heavy Notation.
            </h1>
            <p className="mb-8 text-2xl font-semibold text-zinc-400 dark:text-zinc-500">
              <Trans>Sign in to your account</Trans>.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(signInAction.execute)}
                className="space-y-8"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-700 dark:text-white">
                            <Trans>Email</Trans>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-zinc-200 text-sm text-zinc-700 dark:border-zinc-700 dark:text-white"
                              placeholder={t`Enter your email`}
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-700 dark:text-white">
                            <Trans>Password</Trans>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-zinc-200 text-sm text-zinc-700 dark:border-zinc-700 dark:text-white"
                              placeholder={t`Enter your password`}
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 font-semibold text-white hover:bg-blue-600"
                  >
                    <Trans>Sign In</Trans>
                  </Button>
                </div>
              </form>
            </Form>
            <div className="relative my-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-zinc-200 after:dark:border-zinc-700">
              <span className="relative z-10 bg-white px-2 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500">
                <Trans>Or continue with</Trans>
              </span>
            </div>
            <form action={() => signInWithOAuth("google")}>
              <Button
                variant="outline"
                className="w-full border-zinc-200 bg-zinc-100 font-semibold text-zinc-700 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white hover:dark:bg-zinc-700 hover:dark:text-white"
              >
                <Image
                  src={imgLogoGoogle}
                  alt="Google logo"
                  className="h-4 w-auto"
                />
                <Trans>Sign in with Google</Trans>
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-zinc-700 dark:text-white">
              <Trans>
                Don&apos;t have an account?{" "}
                <Link
                  className="underline"
                  href={lang !== "en" ? `/${lang}/auth/signup` : "/auth/signup"}
                >
                  Sign Up
                </Link>
              </Trans>
            </div>
          </div>
        </div>
      )}
      {signInAction.isPending && (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <Spinner className="mb-8 h-16 w-16 text-zinc-700 dark:text-white" />
          <p className="text-sm text-zinc-700 dark:text-white">
            <Trans>Submitting...</Trans>
          </p>
        </div>
      )}
    </main>
  );
};

export default SignInForm;
