import {TransactionDetails} from "@/components/TransactionDetails";
import {TransactionList} from "@/components/TransactionList";

export default function Home({searchParams}: { searchParams: Record<string, string> }) {
    // NextJS Specific
    const transactionId = Number(searchParams.transaction)

    return (
        <section className="flex">
            <TransactionList transactionId={transactionId}/>
            <div className={'bg-grey-200 min-h-screen w-3/4'}>
                <TransactionDetails transactionId={transactionId}/>
            </div>
        </section>
    );
}
