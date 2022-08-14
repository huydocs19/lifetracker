import "./InputField.css"

export default function InputField({
  name,
  type = "text",
  placeholder,
  label,
  value,
  handleOnChange,
  error,
  ...props
}) {
  return (
    <div className="InputField">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        {...props}
        // anything else
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
}