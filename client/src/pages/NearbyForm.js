import React, { useState } from "react"
import Switch from "../common/Switch"
import TextInput from "../common/TextInput"
import Dropdown from "../common/Dropdown"
import Button from "../common/Button"
import { AVAILABLE_PLACE_TYPES } from "../../constants/common"

const NearByForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    type: AVAILABLE_PLACE_TYPES[0].value
  })

  const submitForm = () => {
    onSubmit(formData)
  }

  const setValue = (key, value) => {
    setFormData({ ...formData, [key]: value || undefined })
  }

  return (
    <div className="side-container" data-test="nearbyForm">
      <div className="side-container__form-element">
        <Dropdown
          id="type-select"
          name="type"
          labelKey="label"
          valueKey="value"
          options={AVAILABLE_PLACE_TYPES}
          placeholder="Select Type"
          onChange={value => setValue("type", value)}
          data-test="nearbyFormDD"
        />
      </div>
      <div className="side-container__form-element">
        <TextInput
          id="keyword-input"
          name="keyword"
          placeholder="Enter Keyword (Optional)"
          onChange={value => setValue("searchKey", value)}
          data-test="nearbyFormTextInput"
        />
      </div>
      <div className="side-container__form-element">
        <span>Only Open Places: &nbsp;&nbsp;</span>
        <Switch
          id="is-open-only-switch"
          defaultChecked={false}
          name="isOpenOnly"
          onChange={value => setValue("opennow", value)}
          switchText={["Yes", "No"]}
          data-test="nearbyFormSwitch"
        />
      </div>
      <div>
        <Button
          value="Search"
          onClick={submitForm}
          isLoading={isLoading}
          data-test="nearbyFormButton"
        />
      </div>
    </div>
  )
}

export default NearByForm