import { Button, InputField } from "components"
import { useNutritionNewForm } from "hooks/useNutritionNewForm"
import "./NutritionNew.css"

export default function NutritionNew() {
  const { form, errors, isLoading, handleOnSubmit, handleOnChange } = useNutritionNewForm()

  return (
    <div className="NutritionNew">
      <h2>Record Nutrition</h2>

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

        <Button
          buttonType="primary"
          color="aqua"
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
