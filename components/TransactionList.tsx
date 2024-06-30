import {alias} from "drizzle-orm/sqlite-core";
import {companies, transactions} from "@/db/schema";
import {db} from "@/db";
import {desc, eq} from "drizzle-orm";
import {cn} from "@/lib/utils";
import {TransactionProps} from "@/lib/types";
import {Badge} from "./ui/badge";
import {CalendarDaysIcon} from "@/components/icons/CalendarDaysIcon";
import Link from "next/link";
import {formatDate, formatMoney} from "@/utils";
import {CreateTransactionButton} from "@/components/CreateTransaction";
import {ScrollArea} from "@/components/ui/scroll-area";

export const TransactionList = async ({transactionId}: TransactionProps) => {
    const payer = alias(companies, 'payer')
    const payee = alias(companies, 'payee')
    const allTransactions = await db.select().from(transactions)
        .leftJoin(payer, eq(transactions.payeeId, payer.id))
        .leftJoin(payee, eq(transactions.payerId, payee.id))
        .orderBy(desc(transactions.id))
    return (
        <aside className="min-h-screen w-1/4 bg-muted/40 border-r px-4 py-6 flex flex-col gap-4">
            <CreateTransactionButton/>
            <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Recent Transactions</span>
            </div>
            <ScrollArea className="flex flex-col gap-2 max-h-[500px]">
                {allTransactions.map(transaction => {
                    const isActive = transactionId && transaction.transactions.id === transactionId
                    const activeClasses = `bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground`
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
                })}
            </ScrollArea>
        </aside>
    )
}
