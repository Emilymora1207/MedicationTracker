import React, { useState } from "react"

const TextInput = ({
  id,
  name,
  placeholder,
  onChange,
  defaultValue,
  className
}) => {
  const [value, setValue] = useState(defaultValue || "")
  const onChangeHandler = e => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }
  return (
    <input
      className={`text-input ${className}`}
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChangeHandler}
      value={value}
      data-test="textInput"
    />
  )
}

export default TextInput