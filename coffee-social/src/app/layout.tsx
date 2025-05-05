export const metadata = {
    title: 'Caffeine Compass',
    description: 'Coffee Catchphrase'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}