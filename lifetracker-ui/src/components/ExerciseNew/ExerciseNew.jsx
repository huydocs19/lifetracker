import { Button, InputField } from "components"
import { useExerciseNewForm } from "hooks/useExerciseNewForm"
import "./ExerciseNew.css"

export default function ExerciseNew() {
  const { form, errors, isLoading, handleOnSubmit, handleOnChange } = useExerciseNewForm()

  return (
    <div className="ExerciseNew">
      <h2>Add Exercise</h2>

      <div className="form">
        {errors.form && <span className="error">{errors.form}</span>}

        <InputField
          name="name"
          type="text"
          label="Name"
          value={form.name}
          error={errors.name}
          placeholder="Exercise name"
          handleOnChange={handleOnChange}
        />

        <InputField
          name="category"
          type="text"
          label="Category"
          value={form.category}
          error={errors.category}
          placeholder="Exercise category"
          handleOnChange={handleOnChange}
        />

        <div className="split-input-field">
          <InputField
            name="duration"
            type="number"
            value={form.duration}
            error={errors.duration}
            label="Duration (min)"
            min={1}
            max={100000000}
            handleOnChange={handleOnChange}
          />
          <InputField
            name="intensity"
            type="number"
            label="Intensity (1-10)"
            value={form.intensity}
            error={errors.intensity}
            handleOnChange={handleOnChange}
            min={0}
            max={10}
          />
        </div>

        <Button
          buttonType="primary"
          color="gold"
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={() => handleOnSubmit()}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
