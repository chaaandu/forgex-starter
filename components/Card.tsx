// A white box with a border, for one thing on a screen: a row, a form, a number.
//
//   <Card>Anything inside</Card>

export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`box p-4 ${className}`}>{children}</div>
}
