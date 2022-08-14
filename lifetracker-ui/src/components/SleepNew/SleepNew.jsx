import { Button, InputField } from "components"
import { useSleepNewForm } from "hooks/useSleepNewForm"
import "./SleepNew.css"

export default function SleepNew() {
  const { form, errors, isLoading, handleOnSubmit, handleOnChange } = useSleepNewForm()

  return (
    <div className="SleepNew">
      <h2>Add Sleep</h2>

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

        <Button
          buttonType="primary"
          color="blue"
          isLoading={isLoading}
          isDisabled={isLoading || errors.endTime}
          onClick={() => handleOnSubmit()}
        >
          Save
        </Button>
      </div>
    </div>
  )
}