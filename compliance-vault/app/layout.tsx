import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Compliance Vault | Food Service Compliance Management',
  description:
    'Automate compliance tracking, certification management, and inspection readiness for food service establishments across every jurisdiction.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.compliancevault.io'),
  openGraph: {
    title: 'Compliance Vault',
    description: 'Never fail an inspection again.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}
