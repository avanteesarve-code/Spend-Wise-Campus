"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";
import { updateDefaultAccount } from "@/actions/accounts";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  // FIXED: Switch gives boolean, not event
  const handleDefaultChange = async (checked) => {
    if (!checked) {
      toast.warning("You need at least one default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }

    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [updatedAccount, error]);

  return (
    <Card className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">

      {/* Fintech Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

        <Link href={`/account/${id}`}>
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
        </Link>

        {/* Switch OUTSIDE Link so it doesn't navigate */}
        <Switch
          checked={isDefault}
          onCheckedChange={handleDefaultChange}
          disabled={updateDefaultLoading}
          className="data-[state=checked]:bg-violet-600"
        />

      </CardHeader>

      <Link href={`/account/${id}`}>

        <CardContent>
          <div className="text-2xl font-bold tracking-tight">
            ${parseFloat(balance).toFixed(2)}
          </div>

          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>

        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>

          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>

      </Link>

    </Card>
  );
}

export default AccountCard;