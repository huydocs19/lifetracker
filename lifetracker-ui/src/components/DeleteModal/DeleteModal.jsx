import Modal from "react-modal"
import { Button} from "components"
import "./DeleteModal.css"

const customStyles = {
    content: {
        position: "relative",
        top: 200,
        left: "auto",
        right: "auto",
        bottom: "auto",
        margin: "0 auto",
        border: 0,
        maxWidth: 500,
        maxHeight: 700,
        textAlign: "center",
        paddingTop: "70px",
        paddingBottom: "45px",
        boxShadow: "0px 18px 36px rgba(0,0,0,0.15)",
        borderRadius: "16px",
    },
  };
export default function DeleteModal({isOpen, toggleModal, deleteItem}) { 
  const handleDeleteItem = async () => {
    await deleteItem()
    toggleModal()
  } 
  return (
    <Modal
        isOpen={isOpen}        
        onRequestClose={toggleModal}
        ariaHideApp={false}
        style={customStyles}        
    >     
        <p className="delete-confirmation-question">Are you sure you want to delete?</p>
        <div className="buttons">
            <Button buttonType="primary" color="red" onClick={handleDeleteItem} size="small">
                {"Yes"}
            </Button> 
            <Button buttonType="primary" color="blue" onClick={toggleModal} size="small">
                {"No"}
            </Button>
        </div>
       
    </Modal>    
  )
}