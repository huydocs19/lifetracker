import {useNavigate, useParams } from "react-router-dom"
import { Button, InputField } from "components"
import { useExerciseEditForm } from "hooks/useExerciseEditForm"
import "./ExerciseEdit.css"

export default function ExerciseEdit() {
  const navigate = useNavigate() 
  const {exerciseId} = useParams()
  const { form, errors, isLoading, handleOnSubmit, handleOnChange } = useExerciseEditForm(exerciseId)
  
  return (
    <div className="ExerciseEdit">
      <h2>Edit Exercise</h2>

      <div className="form">
        {errors.form && <span className="error">{errors.form}</span>}

        <InputField
          name="name"
          type="text"
          label="Name"
          value={form.name}
          error={errors.name}          
          handleOnChange={handleOnChange}
        />

        <InputField
          name="category"
          type="text"
          label="Category"
          value={form.category}
          error={errors.category}          
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
        <div className="buttons">
          <Button
            buttonType="primary"
            color="gold"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => handleOnSubmit()} 
            size = "small"         
          >
            Save
          </Button>
          <Button
            buttonType="primary"
            color="blue"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => navigate(`/exercise/${exerciseId}`)}
            size = "small"         
          >
            Cancel
          </Button>
        </div>
        
      </div>
    </div>
  )
}