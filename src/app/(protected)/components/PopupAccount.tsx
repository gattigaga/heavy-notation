"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Trans, useLingui } from "@lingui/react/macro";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/app/components/Spinner";
import AvatarPicker from "./AvatarPicker";
import { getUpdateAccountSchema } from "../validations";
import useUpdateUserMutation from "../hooks/mutations/use-update-user-mutation";
import usePagesQuery from "../hooks/queries/use-pages-query";

type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const PopupAccount = ({ isOpen, onOpenChange }: Props) => {
  const { t, i18n } = useLingui();
  const { data: session, update: updateSession } = useSession();
  const pagesQuery = usePagesQuery();
  const updateUserMutation = useUpdateUserMutation();

  const updateAccountSchema = getUpdateAccountSchema(i18n);

  const form = useForm<z.infer<typeof updateAccountSchema>>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const image = form.watch("image");

  const submit = (data: z.infer<typeof updateAccountSchema>) => {
    updateUserMutation.mutate(data, {
      onError: () => {
        toast.error(t`Failed to update your account.`);
      },
      onSuccess: (response) => {
        updateSession({
          name: response.name,
          image: response.image,
        });

        pagesQuery.refetch();
        toast.success(t`Your account has been updated.`);
      },
      onSettled: () => {
        onOpenChange?.(false);
      },
    });
  };

  // Reset form when popup is closed.
  useEffect(() => {
    if (!isOpen) {
      form.reset();
    } else {
      form.setValue("name", session?.user.name);
    }
  }, [isOpen, session?.user.name]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
        <DialogHeader className="mb-8 space-y-0">
          <DialogTitle className="text-lg font-semibold text-zinc-700 dark:text-white">
            <Trans>Account</Trans>
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400 dark:text-zinc-500">
            <Trans>Update your account information.</Trans>
          </DialogDescription>
        </DialogHeader>

        {!updateUserMutation.isPending && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
              <div className="grid gap-4">
                <div className="flex flex-col items-center justify-center">
                  <AvatarPicker
                    placeholder={session?.user.name[0]?.toUpperCase() || ""}
                    preview={session?.user.image}
                    value={image}
                    onChange={(value) => form.setValue("image", value)}
                  />
                  {form.formState.errors.image && (
                    <FormMessage className="mt-4 text-red-500">
                      {form.formState.errors.image.message}
                    </FormMessage>
                  )}
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-700 dark:text-white">
                          <Trans>Name</Trans>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-zinc-200 text-sm text-zinc-700 dark:border-zinc-700 dark:text-white"
                            placeholder={t`Enter your name`}
                            type="text"
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
                  <Trans>Update</Trans>
                </Button>
              </div>
            </form>
          </Form>
        )}
        {updateUserMutation.isPending && (
          <div className="flex h-64 w-full flex-col items-center justify-center">
            <Spinner className="mb-8 h-16 w-16 text-zinc-700 dark:text-white" />
            <p className="text-sm text-zinc-700 dark:text-white">
              <Trans>Submitting...</Trans>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupAccount;
