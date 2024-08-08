import {TransactionProps} from "@/lib/types";
import {CalendarDaysIcon} from "@/components/icons/CalendarDaysIcon";
import {ScrollArea} from "@/components/ui/scroll-area";
import {db} from "@/db";
import {transactions} from "@/db/schema";

export const TransactionList = async ({transactionId}: TransactionProps) => {
    const data = await db.select().from(transactions);
    return (
        <aside className="min-h-screen w-1/4 bg-muted/40 border-r px-4 py-6 flex flex-col gap-4">
            {/* Create transaction button should go here*/}
            <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Recent Transactions</span>
            </div>
            <ScrollArea className="flex flex-col gap-2 max-h-[500px]">
                {/*    List of transactions should go here*/}
                {JSON.stringify(data, null, 2)}
            </ScrollArea>
        </aside>
    )
}
