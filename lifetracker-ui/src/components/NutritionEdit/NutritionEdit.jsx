import {useNavigate, useParams } from "react-router-dom"
import { Button, InputField } from "components"
import { useNutritionEditForm } from "hooks/useNutritionEditForm"
import "./NutritionEdit.css"

export default function NutritionEdit() {
  const navigate = useNavigate()
  const {nutritionId} = useParams()
  const { form, errors, isLoading, handleOnSubmit, handleOnChange } = useNutritionEditForm(nutritionId)

  return (
    <div className="NutritionEdit">
      <h2>Edit Nutrition</h2>

      <div className="form">
        {errors.form && <span className="error">{errors.form}</span>}

        <InputField
          name="name"
          type="text"
          label="Name"
          value={form.name}
          error={errors.name}
          placeholder="Nutrition name"
          handleOnChange={handleOnChange}
        />

        <InputField
          name="category"
          type="text"
          label="Category"
          value={form.category}
          error={errors.category}
          placeholder="Nutrition category"
          handleOnChange={handleOnChange}
        />

        <div className="split-input-field">
          <InputField
            name="quantity"
            type="number"
            value={form.quantity}
            error={errors.quantity}
            label="Quantity"
            min={1}
            max={100000000}
            handleOnChange={handleOnChange}
          />
          <InputField
            name="calories"
            type="number"
            label="Calories"
            value={form.calories}
            error={errors.calories}
            handleOnChange={handleOnChange}
            min={0}
            max={10000000000}
            step={10}
          />
        </div>

        <InputField
          name="imageUrl"
          type="text"
          label="Image URL"
          value={form.imageUrl}
          error={errors.imageUrl}
          placeholder="http://www.food-image.com/1"
          handleOnChange={handleOnChange}
        />

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
            onClick={() => navigate(`/nutrition/${nutritionId}`)}
            size = "small"         
          >
            Cancel
          </Button>
        </div>
        
      </div>
    </div>
  )
}