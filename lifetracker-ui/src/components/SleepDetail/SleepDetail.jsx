import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, DeleteModal, NotFound } from "components"
import { useSleepDetail } from "hooks/useSleepDetail"
import {formatDateAndTime } from "utils/format"
import { calculateHoursDifference } from "utils/calculations"
import "./SleepDetail.css"

export default function SleepDetail() { 
  const navigate = useNavigate() 
  const { sleepId } = useParams()
  const { isFetching, sleep, error, deleteSleep } = useSleepDetail(sleepId) 
  const [isDeleting, setIsDeleting] = useState(false) 

  if (isFetching) return null

  if (!sleep?.id) {
    return <NotFound message={"No sleep found."} />
  }
  return (
    <div className="SleepDetail">  
        <DeleteModal isOpen={isDeleting} toggleModal={() => setIsDeleting(false)} deleteItem={deleteSleep}></DeleteModal>      
        <p className={`error ${error && "show"}`}>{error && `Error: ${error}`}</p>               
          <div className="sleep-info">
            <h1>Sleep #{sleep.id}</h1>
            <ul className="lineItems">
                <li>
                  <p>Start Time</p>
                  <p>{formatDateAndTime(sleep.startTime)}</p>              
                </li>
                <li>
                  <p>End Time</p>
                  <p>{formatDateAndTime(sleep.endTime)}</p>             
                </li>               
                <li>
                  <p>Number Hours Slept</p>
                  <p>{calculateHoursDifference(sleep.startTime, sleep.endTime)}</p>            
                </li> 
                <li>
                  <p>Date Created</p>
                  <p>{formatDateAndTime(sleep.createdAt)}</p>              
                </li>                 
            </ul>
          <div className="buttons"> 
            <Button buttonType="primary" color="gold" onClick={() => navigate(`/sleep/${sleep.id}/edit`)} size="small">
              {"Edit"}
            </Button> 
            <Button buttonType="primary" color="red" onClick={() => setIsDeleting(true)} size="small">
              {"Delete"}
            </Button> 
            <Button buttonType="primary" color="blue" onClick={() => navigate("/sleep")} size="small">
              {"Back"}
            </Button>   
          </div>

                  
          
      </div>       

    </div>
  )
}