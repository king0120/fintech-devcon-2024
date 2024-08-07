export default function Home({searchParams}: { searchParams: Record<string, string> }) {
    // NextJS Specific
    const transactionId = Number(searchParams.transaction)

    return (
        <section className="flex">
            {/*TRANSACTION LIST HERE*/}
            <div className={'bg-grey-200 min-h-screen w-3/4'}>
                {/*TRANSACTION DETAILS HERE*/}
            </div>
        </section>
    );
}
