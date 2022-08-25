import {useNavigate, useParams } from "react-router-dom"
import { Button, InputField } from "components"
import { useSleepEditForm } from "hooks/useSleepEditForm"
import "./SleepEdit.css"

export default function SleepEdit() {
  const navigate = useNavigate()
  const {sleepId} = useParams()
  const { form, errors, isLoading, handleOnSubmit, handleOnChange } = useSleepEditForm(sleepId)  
  return (
    <div className="SleepEdit">
      <h2>Edit Sleep</h2>

      <div className="form">
        {errors.form && <span className="error">{errors.form}</span>}

        <InputField
          name="startTime"
          type="datetime-local"
          label="Start Time"
          value={form.startTime}
          error={errors.startTime}
          handleOnChange={handleOnChange}
        />

        <InputField
          name="endTime"
          type="datetime-local"
          label="End Time"
          value={form.endTime}
          error={errors.endTime}
          handleOnChange={handleOnChange}
        />

        <div className="buttons">
          <Button
            buttonType="primary"
            color="gold"
            isLoading={isLoading}
            isDisabled={isLoading || errors.endTime}
            onClick={() => handleOnSubmit()}
            size="small"
          >
            Save
          </Button>
          <Button
            buttonType="primary"
            color="blue"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => navigate(`/sleep/${sleepId}`)}
            size = "small"         
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}