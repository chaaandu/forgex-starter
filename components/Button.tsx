// A button. Two looks: 'main' for the one action that matters on a screen,
// 'quiet' for everything else.
//
//   <Button>Save</Button>
//   <Button look="quiet" type="button">Cancel</Button>
//
// For a link that looks like a button, use <Link className="btn"> instead.

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  look?: 'main' | 'quiet'
}

export default function Button({ look = 'main', className = '', ...props }: ButtonProps) {
  const style = look === 'main' ? 'btn' : 'btn-quiet'
  return <button className={`${style} ${className}`} {...props} />
}
