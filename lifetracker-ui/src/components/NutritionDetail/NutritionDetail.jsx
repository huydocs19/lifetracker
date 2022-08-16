import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, DeleteModal, NotFound } from "components"
import { useNutritionDetail } from "hooks/useNutritionDetail"
import { formatDateAndTime } from "utils/format"
import "./NutritionDetail.css"

export default function NutritionDetail() { 
  const navigate = useNavigate() 
  const { nutritionId } = useParams()
  const { isFetching, nutrition, error, deleteNutrition } = useNutritionDetail(nutritionId)  
  const [isDeleting, setIsDeleting] = useState(false) 

  if (isFetching) return null

  if (!nutrition?.id) {
    return <NotFound message={"No listing found."} />
  }
  return (
    <div className="NutritionDetail">  
        <DeleteModal isOpen={isDeleting} toggleModal={() => setIsDeleting(false)} deleteItem={deleteNutrition}></DeleteModal>   
        <p className={`error ${error && "show"}`}>{error && `Error: ${error}`}</p>               
          <div className="nutrition-info">
            <h1>Nutrition #{nutrition.id}</h1>
            <ul className="lineItems">
                <li>
                  <p>Name</p>
                  <p>{nutrition.name}</p>              
                </li>
                <li>
                  <p>Category</p>
                  <p>{nutrition.category}</p>             
                </li>               
                <li>
                  <p>Quantity</p>
                  <p>{nutrition.quantity}</p>            
                </li>                
                <li>
                  <p>Calories</p>
                  <p>{nutrition.calories}</p>              
                </li>
                <li>
                  <p>Image URL</p>
                  <p>{nutrition.imageUrl}</p>              
                </li>
                <li>
                  <p>Date Created</p>
                  <p>{formatDateAndTime(nutrition.createdAt)}</p>              
                </li>                 
            </ul>
          <div className="buttons"> 
            <Button buttonType="primary" color="gold" onClick={() => navigate(`/nutrition/${nutrition.id}/edit`)} size="small">
              {"Edit"}
            </Button> 
            <Button buttonType="primary" color="red" onClick={() => setIsDeleting(true)} size="small">
              {"Delete"}
            </Button> 
            <Button buttonType="primary" color="blue" onClick={() => navigate("/nutrition")} size="small">
              {"Back"}
            </Button>   
          </div>

                  
          
      </div>       

    </div>
  )
}