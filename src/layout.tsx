import './globals.css'

export const metadata = {
  title: 'Tech Fiddle Meet',
  description: 'The Tech Fiddle Meet Web App.',
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
