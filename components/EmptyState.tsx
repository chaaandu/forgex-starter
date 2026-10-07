// What a screen shows when there is nothing in it yet.
// Give a reason and a next step: what will show here, and how to add the first one.
//
//   <EmptyState title="Nothing here yet" text="Add your first one below." />

export default function EmptyState({
  title,
  text,
  children,
}: {
  title: string
  text?: string
  children?: React.ReactNode
}) {
  return (
    <div className="box border-dashed p-6 text-center">
      <p className="font-medium">{title}</p>
      {text && <p className="mt-1 text-sm text-muted">{text}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
