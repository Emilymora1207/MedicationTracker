import React, { useState } from "react"

const Switch = ({
  defaultChecked,
  disabled,
  id,
  name,
  switchText,
  onChange,
  className
}) => {
  const [checked, setChecked] = useState(defaultChecked)

  function onChangeHandler(e) {
    setChecked(!checked)
    onChange && onChange(!checked)
  }

  return (
    <div className={`toggle-switch ${className || ""}`}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch__checkbox"
        id={id}
        defaultChecked={checked}
        onChange={onChangeHandler}
        data-test="switch"
      />
      {id ? (
        <label className="toggle-switch__label" htmlFor={id}>
          <span
            className={`toggle-switch__inner ${
              disabled ? "toggle-switch__inner--disabled" : ""
            }`}
            data-yes={switchText[0]}
            data-no={switchText[1]}
          />
          <span
            className={`toggle-switch__slider ${
              disabled ? "toggle-switch__slider--disabled" : ""
            }`}
          />
        </label>
      ) : null}
    </div>
  )
}

export default Switch