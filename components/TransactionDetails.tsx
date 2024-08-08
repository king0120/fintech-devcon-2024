import {alias} from "drizzle-orm/sqlite-core";
import {companies, transactions} from "@/db/schema";
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {TransactionProps} from "@/lib/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge";
import {LineChart} from "@/components/client/LineChart";
import {formatMoney, sleep} from "@/lib/utils";

export const TransactionDetails = async ({transactionId}: TransactionProps) => {
    if (!transactionId) return null
    // await sleep(6000)
    try {

        const payer = alias(companies, 'payer')
        const payee = alias(companies, 'payee')
        // We only want to select the first row
        const [data] = await db.select().from(transactions)
            .leftJoin(payer, eq(transactions.payeeId, payer.id))
            .leftJoin(payee, eq(transactions.payerId, payee.id))
            .where(eq(transactions.id, transactionId));
        return (
            <div className="flex flex-col min-h-screen bg-background">
                {JSON.stringify(data)}
                <header className="bg-muted/40 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon">
                            <ArrowLeftIcon className="h-4 w-4"/>
                            <span className="sr-only">Back</span>
                        </Button>
                        <div>
                            <div className="text-sm text-muted-foreground">Transaction</div>
                            <h1 className="font-semibold text-lg">
                                {data.transactions.id} - {formatMoney(data.transactions.amount)}
                                <span className="font-normal text-muted-foreground"> on </span> {/* Date of Transaction*/}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="px-3 py-1 text-sm text-primary-foreground">
                            {/* Transaction Status */}
                        </Badge>
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 lg:p-10 grid gap-6 md:gap-8 lg:gap-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        <Card>
                            <CardHeader>
                                <CardTitle>Source Account</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Account Number</span>
                                    <span>**** **** </span> {/* Masked Account Number */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Account Type</span>
                                    <span></span> {/* Account Type */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Balance</span>
                                    <span></span> {/* Account Balance */}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Destination Account</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Account Number</span>
                                    <span>**** **** </span> {/* Masked Account Number */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Account Type</span>
                                    <span></span> {/* Account Type */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Balance</span>
                                    <span></span> {/* Account Balance */}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Initiation Date</span>
                                    <span></span> {/* Date of Transaction */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Initiation  Time</span>
                                    <span></span> {/* Time of Transaction */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Completion Date</span>
                                    <span></span> {/* Date of Completion */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Completion Time</span>
                                    <span></span> {/* Time of Completion */}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fees & Charges</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Transfer Fee</span>
                                    <span></span> {/* Transfer Fee */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Overdraft Fee</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Total Fees</span>
                                    <span></span> {/* Total Fees */}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-semibold"></span> {/* Transaction Amount */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Fees</span>
                                    <span></span> {/* Transaction Fees */}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Net Amount</span>
                                    <span className="font-semibold"></span> {/* Net Transaction Amount */}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <LineChart className="aspect-[9/4]"/>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        )
    } catch (error)    {
        return <div>
            An error occurred when rendering the Transaction details
        </div>
    }

}

