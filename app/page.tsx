import {TransactionDetails} from "@/components/TransactionDetails";
import {TransactionList} from "@/components/TransactionList";
import {Suspense} from "react";

export default function Home({searchParams}: { searchParams: Record<string, string> }) {
    // NextJS Specific
    const transactionId = Number(searchParams.transaction)

    return (
        <section className="flex">
            <TransactionList transactionId={transactionId}/>
            <div className={'bg-grey-200 min-h-screen w-3/4'}>
                <Suspense key={transactionId} fallback={<div>Loading...</div>}>
                    <TransactionDetails transactionId={transactionId}/>
                </Suspense>
            </div>
        </section>
    );
}
