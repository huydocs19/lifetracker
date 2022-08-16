import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, DeleteModal, NotFound } from "components"
import { useExerciseDetail } from "hooks/useExerciseDetail"
import { formatDateAndTime } from "utils/format"
import "./ExerciseDetail.css"

export default function ExerciseDetail() { 
  const navigate = useNavigate() 
  const { exerciseId } = useParams()
  const { isFetching, exercise, error, deleteExercise } = useExerciseDetail(exerciseId)  
  const [isDeleting, setIsDeleting] = useState(false) 

  if (isFetching) return null

  if (!exercise?.id) {
    return <NotFound message={"No listing found."} />
  }
  return (
    <div className="ExerciseDetail">
        <DeleteModal isOpen={isDeleting} toggleModal={() => setIsDeleting(false)} deleteItem={deleteExercise}></DeleteModal>      
        <p className={`error ${error && "show"}`}>{error && `Error: ${error}`}</p>               
          <div className="exercise-info">
            <h1>Exercise #{exercise.id}</h1>
            <ul className="lineItems">
                <li>
                  <p>Name</p>
                  <p>{exercise.name}</p>              
                </li>
                <li>
                  <p>Category</p>
                  <p>{exercise.category}</p>             
                </li>               
                <li>
                  <p>Duration</p>
                  <p>{exercise.duration}</p>            
                </li>                
                <li>
                  <p>Intensity</p>
                  <p>{exercise.intensity}</p>              
                </li>
                <li>
                  <p>Date Created</p>
                  <p>{formatDateAndTime(exercise.createdAt)}</p>              
                </li>                 
            </ul>
          <div className="buttons"> 
            <Button buttonType="primary" color="gold" onClick={() => navigate(`/exercise/${exercise.id}/edit`)} size="small">
              {"Edit"}
            </Button> 
            <Button buttonType="primary" color="red" onClick={() => setIsDeleting(true)} size="small">
              {"Delete"}
            </Button> 
            <Button buttonType="primary" color="blue" onClick={() => navigate("/exercise")} size="small">
              {"Back"}
            </Button>   
          </div>

                  
          
      </div>       

    </div>
  )
}