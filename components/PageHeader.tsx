// The heading at the top of a screen, with an optional line under it and an
// optional button on the right.
//
//   <PageHeader title="Example items" text="A short line about this screen." />

export default function PageHeader({
  title,
  text,
  action,
}: {
  title: string
  text?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold">{title}</h1>
        {text && <p className="mt-1 text-muted">{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
