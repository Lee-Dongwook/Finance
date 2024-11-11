import { useNewTransaction } from "@/store/useNewTransaction";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FormTransaction,
  ApiFormValues,
} from "@/components/transactions/TransactionForm";
import { useCreateTransaction } from "@/services/transactions/use-create-transaction";
import { useCreateCategories } from "@/services/categories/use-create-categories";
import { useGetCategories } from "@/services/categories/use-get-categories";
import { useGetAccounts } from "@/services/accounts/use-get-accounts";
import { useCreateAccounts } from "@/services/accounts/use-create-accounts";
import { Loader2 } from "lucide-react";

export const useNewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();

  const categoriesQuery = useGetCategories();

  const mutationCategory = useCreateCategories();

  const onCreateCategory = (name: string) =>
    mutationCategory.mutate({
      name,
    });

  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();

  const mutationAccount = useCreateAccounts();

  const onCreateAccount = (name: string) =>
    mutationAccount.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    createMutation.isPending ||
    mutationCategory.isPending ||
    mutationAccount.isPending;

  const isLoading = categoriesQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (value: ApiFormValues) => {
    createMutation.mutate(value, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = () => {};

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add new transaction</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <FormTransaction
            onSubmit={onSubmit}
            onDelete={onDelete}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
