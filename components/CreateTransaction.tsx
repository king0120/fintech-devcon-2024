import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {db} from "@/db";
import {companies, transactions} from "@/db/schema";
import {redirect} from "next/navigation";

export const CreateTransactionButton = async () => {
    const accounts = await db.select().from(companies)
    const handleSubmit = async (formData: FormData) => {
        'use server'
        // parser form data
        const sourceAccount = formData.get('source-account') as string
        const destinationAccount = formData.get('destination-account') as string
        const description = formData.get('description') as string
        const amount = formData.get('amount') as string
        const facilitatorFee = formData.get('facilitatorFee') as string
        // create transaction
        const newTransactions = await db.insert(transactions).values({
                payerId: Number(sourceAccount),
                payeeId: Number(destinationAccount),
                description: description ?? 'No description',
                amount: Number(amount),
                facilitatorFee: Number(facilitatorFee),
                status: 'pending',
                dateInitiated: new Date().toISOString(),
            }
        ).returning()
        const newTransaction = newTransactions[0]
        // NextJS Specific
        redirect('/?transaction=' + newTransaction.id)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">New Transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>New Transaction</DialogTitle>
                        <DialogDescription>Enter the details of your new transaction.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label htmlFor="amount" className="text-right text-foreground">
                                Description
                            </Label>
                            <Input id="description" name={'description'} placeholder="Enter description"
                                   className="text-foreground"/>
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label htmlFor="source-account" className="text-right text-foreground">
                                Source Account
                            </Label>
                            <Select name="source-account">
                                <SelectTrigger className="text-foreground">
                                    <SelectValue placeholder="Select account"/>
                                </SelectTrigger>
                                <SelectContent className="bg-background text-foreground">
                                    {accounts.map(account => (
                                        <SelectItem key={account.id} value={account.id.toString()}
                                                    className="text-foreground">
                                            {account.name} - **** **** {account.maskedAccountNumber}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label htmlFor="destination-account" className="text-right text-foreground">
                                Destination Account
                            </Label>
                            <Select name="destination-account">
                                <SelectTrigger className="text-foreground">
                                    <SelectValue placeholder="Select account"/>
                                </SelectTrigger>
                                <SelectContent className="bg-background text-foreground">
                                    {accounts.map(account => (
                                        <SelectItem key={account.id} value={account.id.toString()}
                                                    className="text-foreground">
                                            {account.name} - **** **** {account.maskedAccountNumber}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label htmlFor="amount" className="text-right text-foreground">
                                Amount
                            </Label>
                            <Input id="amount" name={'amount'} type="number" placeholder="Enter amount"
                                   className="text-foreground"/>
                        </div>
                        <div className="grid items-center grid-cols-2 gap-4">
                            <Label htmlFor="facilitatorFee" className="text-right text-foreground">
                                Fee
                            </Label>
                            <Input id="facilitatorFee" name={'facilitatorFee'} type="number" placeholder="Enter amount"
                                   className="text-foreground"/>
                        </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button type="submit" className="text-foreground">
                                    Save Transaction
                                </Button>
                            </DialogClose>
                            <DialogClose>
                                <Button variant="outline" type="button" className="text-foreground">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
