import React, { useState } from "react"

const Dropdown = ({
  options,
  labelKey,
  valueKey,
  id,
  name,
  placeholder,
  defaultValue,
  onChange,
  className
}) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = e => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  const selectOptions = options.map(data => (
    <option key={data[valueKey]} value={data[valueKey]}>
      {data[labelKey]}
    </option>
  ))

  return (
    <select
      id={id}
      name={name}
      onChange={handleChange}
      value={value}
      className={`dropdown ${className || ""}`}
      data-test="dropdown"
    >
      {placeholder && <option disabled>{placeholder}</option>}
      {selectOptions}
    </select>
  )
}

export default Dropdown