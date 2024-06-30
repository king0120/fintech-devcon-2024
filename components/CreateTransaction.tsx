import {Button} from "@/components/ui/button";
import {
    Dialog,
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

export const CreateTransactionButton = async () => {
    const handleSubmit = async (formData: FormData) => {
        'use server'
        console.log({formData})
        // parser form data
        const sourceAccount = formData.get('source-account') as string
        const destinationAccount = formData.get('destination-account') as string
        const amount = formData.get('amount') as string
        const date = formData.get('date') as string
        console.log({sourceAccount, destinationAccount, amount, date})
        // create transaction
        // const newTransactions = await db.insert(transactions).values({

        // const newTransactions = await db.insert(transactions).values({
        //         payerId: 1,
        //         payeeId: 2,
        //         amount: 1000,
        //         status: 'pending',
        //         date: new Date().toISOString()
        //     }
        // ).returning()
        // const newTransaction = newTransactions[0]
        // // NextJS Specific
        // redirect('/?transaction=' + newTransaction.id)
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
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="source-account" className="text-right text-foreground">
                                Source Account
                            </Label>
                            <Select name="source-account">
                                <SelectTrigger className="text-foreground">
                                    <SelectValue placeholder="Select account"/>
                                </SelectTrigger>
                                <SelectContent className="bg-background text-foreground">
                                    <SelectItem value="1234 5678 9012" className="text-foreground">
                                        1234 5678 9012 - Checking
                                    </SelectItem>
                                    <SelectItem value="9876 5432 1098" className="text-foreground">
                                        9876 5432 1098 - Savings
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="destination-account" className="text-right text-foreground">
                                Destination Account
                            </Label>
                            <Select name="destination-account">
                                <SelectTrigger className="text-foreground">
                                    <SelectValue placeholder="Select account"/>
                                </SelectTrigger>
                                <SelectContent className="bg-background text-foreground">
                                    <SelectItem value="9876 5432 1098" className="text-foreground">
                                        9876 5432 1098 - Savings
                                    </SelectItem>
                                    <SelectItem value="1234 5678 9012" className="text-foreground">
                                        1234 5678 9012 - Checking
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="amount" className="text-right text-foreground">
                                Amount
                            </Label>
                            <Input id="amount" name={'amount'} type="number" placeholder="Enter amount"
                                   className="text-foreground"/>
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="date" className="text-right text-foreground">
                                Date
                            </Label>
                            <Input id="date" name={'date'} type="date" className="text-foreground"/>
                        </div>

                        <DialogFooter>
                            <Button type="submit" className="text-foreground">
                                Save Transaction
                            </Button>
                            <div>
                                <Button variant="outline" type="button" className="text-foreground">
                                    Cancel
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
