import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";

// This is the starting point for the list items. It will be used later in the workshop
export const TransactionListItem = async ({transactionId}: TransactionProps) => {
    return (
        <Link key={transaction.transactions.id} href={`/?transaction=${transaction.transactions.id}`}
              className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground", isActive && activeClasses)}>
            <div className="flex-1 truncate">
                <div
                    className="font-medium">#{transaction.transactions.id} - {formatMoney(transaction.transactions.amount)}</div>
                <div
                    className={cn("text-xs text-muted-foreground", isActive && 'text-primary-foreground/80')}>
                    {transaction.transactions.dateCompleted ? formatDate(new Date(transaction.transactions.dateCompleted)) : 'Pending'}
                </div>
            </div>
            <Badge variant={isActive ? 'outline' : "secondary"}
                   className={cn("px-2 py-1 text-xs", isActive && 'text-primary-foreground')}>
                Completed
            </Badge>

        </Link>
    )
}