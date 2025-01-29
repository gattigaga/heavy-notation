"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";

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
import { signUpSchema } from "../validation";
import { signUp } from "../actions";
import Spinner from "@/app/auth/components/Spinner";
import { signInWithOAuth } from "@/app/(protected)/actions";

const SignUpForm = () => {
  const signUpAction = useAction(signUp);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Show error from server action if any.
  useEffect(() => {
    if (signUpAction.hasErrored) {
      // Handle validation errors.
      if (signUpAction.result.validationErrors) {
        const validation = signUpAction.result.validationErrors;

        if (validation._errors) {
          toast.error(validation._errors?.[0]);
        }

        if (validation.name) {
          form.setError("name", {
            type: "manual",
            message: validation.name._errors?.[0],
          });
        }

        if (validation.username) {
          form.setError("username", {
            type: "manual",
            message: validation.username._errors?.[0],
          });
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

        if (validation.confirmPassword) {
          form.setError("confirmPassword", {
            type: "manual",
            message: validation.confirmPassword._errors?.[0],
          });
        }
      }

      // Handle server error.
      if (signUpAction.result.serverError) {
        toast.error("Server can't process your request.");
      }

      signUpAction.reset();
    }
  }, [signUpAction.hasErrored, signUpAction.result.validationErrors, form]);

  return (
    <>
      {!signUpAction.isPending && (
        <div className="flex flex-col items-center px-6 py-24">
          <div className="min-w-80 max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-700">
              Heavy Notation.
            </h1>
            <p className="mb-8 text-2xl font-semibold text-zinc-400">
              Create a new account.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(signUpAction.execute)}
                className="space-y-8"
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-700">Name</FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-zinc-700"
                              placeholder="Enter your name"
                              type="text"
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
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-700">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-zinc-700"
                              placeholder="Enter your username"
                              type="text"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-700">Email</FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-zinc-700"
                              placeholder="Enter your email"
                              type="text"
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
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-700">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-sm text-zinc-700"
                              placeholder="Enter your password again"
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
                    Sign Up
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="#3f3f46"
                  />
                </svg>
                Sign in with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-zinc-700">
              Already have an account?{" "}
              <Link href="/auth/signin" className="underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
      {signUpAction.isPending && (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <Spinner className="mb-8 h-16 w-16" />
          <p>Submitting...</p>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
