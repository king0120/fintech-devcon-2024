import "../styles/globals.css";
import {Manrope} from "next/font/google";
import {cn} from "@/lib/utils";


const fontHeading = Manrope({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
})

const fontBody = Manrope({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
        <head/>
        <body
            className={cn(
                'antialiased',
                fontHeading.variable,
                fontBody.variable
            )}
        >
        {children}
        </body>
        </html>
    );
}
