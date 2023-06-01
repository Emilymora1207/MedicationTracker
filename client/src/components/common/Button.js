import React from "react"

const Button = ({ value, onClick, className, isLoading }) => {
  const onClickHandler = () => {
    onClick && onClick()
  }
  return (
    <input
      type="submit"
      className={`button ${className || ""}`}
      value={isLoading ? "Loading..." : value}
      onClick={onClickHandler}
      data-test="button"
    />
  )
}

export default Button