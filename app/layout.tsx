import "./globals.css";

export const metadata = {
  title: 'Ticket Management System',
  description: 'Company ticket and service request management',
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
