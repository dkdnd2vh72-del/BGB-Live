tsx
export const metadata = {
  title: 'BGB Live',
  description: 'Live golf leaderboard'
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
