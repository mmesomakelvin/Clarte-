export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-clarte-gray-100">
      {children}
    </div>
  )
}
