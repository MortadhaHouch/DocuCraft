export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <div className="flex-1 space-y-6 p-6">
        {children}
    </div>
  )
}
