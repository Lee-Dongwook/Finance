import CurrencyInput from "react-currency-input-field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

interface AmountInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AmountInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: AmountInputProps) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;
    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "bg-slate-400 hover:bg-slate-500 p-2 absolute top-1.5 left-1.5 rounded-md flex items-center justify-center transition",
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600"
              )}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <PlusCircle className="size-3 text-white" />}
              {isExpense && <MinusCircle className="size-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>수입은 +, 지출은 - 버튼을 사용합니다.</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CurrencyInput
        className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={value}
        placeholder={placeholder}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && "수입으로 계산됩니다."}
        {isExpense && "지출로 계산됩니다."}
      </p>
    </div>
  );
};
