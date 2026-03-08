"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
  DrawerClose,
} from "./ui/drawer";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
import { accountSchema } from "@/app/lib/schema";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "./ui/select";

import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

import { useFetch } from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  // ✅ FIX: define isDefault using watch
  const isDefault = watch("isDefault");

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  const onSubmit = async (data) => {
    await createAccountFn({
      ...data,
      balance: parseFloat(data.balance),
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="bg-white p-6 rounded-lg shadow-lg">
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            {/* Account Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Name</label>

              <Input
                placeholder="e.g., Main Checking"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Type</label>

              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Initial Balance */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Initial Balance</label>

              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
              />

              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            {/* Default Toggle */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <label className="text-sm font-medium cursor-pointer">
                  Set As Default
                </label>

                <p className="text-xs text-muted-foreground">
                  This account will be selected automatically
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={isDefault}
                  onCheckedChange={(checked) =>
                    setValue("isDefault", checked)
                  }
                  className="data-[state=checked]:bg-violet-600"
                />

                <span className="text-xs font-semibold w-10 text-center">
                  {isDefault ? "ON" : "OFF"}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;