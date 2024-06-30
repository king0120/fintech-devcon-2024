import {Suspense} from "react";
import {TransactionList} from "@/components/TransactionList";
import {TransactionDetails} from "@/components/TransactionDetails";


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
