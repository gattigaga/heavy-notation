"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import Image from "next/image";

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
import { signInSchema } from "../validation";
import { signIn } from "../actions";
import Spinner from "../../components/Spinner";
import { signInWithOAuth } from "@/app/(protected)/actions";
import imgLogoGoogle from "../../../../../public/images/logo-google.png";

const SignInForm = () => {
  const signInAction = useAction(signIn);

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
        toast.error("Server can't process your request.");
      }

      signInAction.reset();
    }
  }, [signInAction.hasErrored, signInAction.result.validationErrors, form]);

  return (
    <>
      {!signInAction.isPending && (
        <div className="flex flex-col items-center px-6 py-24">
          <div className="min-w-80 max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-700">
              Heavy Notation.
            </h1>
            <p className="mb-8 text-2xl font-semibold text-zinc-400">
              Sign in to your account.
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
                          <FormLabel className="text-zinc-700">Email</FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-zinc-700"
                              placeholder="Enter your email"
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
                          <FormLabel className="text-zinc-700">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-zinc-700"
                              placeholder="Enter your password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="mt-4 w-full bg-blue-500">
                    Sign In
                  </Button>
                </div>
              </form>
            </Form>
            <div className="relative my-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-zinc-400">
                Or continue with
              </span>
            </div>
            <form action={() => signInWithOAuth("google")}>
              <Button variant="outline" className="w-full text-zinc-700">
                <Image
                  src={imgLogoGoogle}
                  alt="Google logo"
                  className="h-4 w-auto"
                />
                Sign in with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-zinc-700">
              Don&apos;t have an account?{" "}
              <Link className="underline" href="/auth/signup" prefetch={true}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
      {signInAction.isPending && (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <Spinner className="mb-8 h-16 w-16" />
          <p>Submitting...</p>
        </div>
      )}
    </>
  );
};

export default SignInForm;
