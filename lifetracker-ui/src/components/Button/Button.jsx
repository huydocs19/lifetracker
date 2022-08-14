import "./Button.css"

export default function Button({
  children,
  className = "",
  buttonType = "outline",
  color = "",
  size = "large",
  isLoading = false,
  isDisabled = false,
  onClick = () => {},
}) {
  return (
    <button className={`Button ${buttonType} ${size} ${className} ${color}`} onClick={onClick} disabled={isDisabled}>
      {isLoading ? <span>Loading...</span> : children}
    </button>
  )
}
