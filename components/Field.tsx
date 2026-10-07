// A text box with its label above it.
//
//   <Field label="Title" name="title" required />
//   <Field label="Note" name="note" multiline />
//
// "name" is what the server action reads: formData.get('title').
// A placeholder shows an example, never an instruction.

type FieldProps = {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  // true for a bigger box, for a few lines of text
  multiline?: boolean
}

export default function Field({ label, name, multiline, ...props }: FieldProps) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      {multiline ? (
        <textarea id={name} name={name} rows={3} className="field" {...props} />
      ) : (
        <input id={name} name={name} className="field" {...props} />
      )}
    </div>
  )
}
