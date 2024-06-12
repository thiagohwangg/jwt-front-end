import { Button, Modal } from "react-bootstrap"


const ModalDelete = ({show, handleClose, confirmDeleteUser, dataModal}) => {
  return (
    <>
         <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are sure to delete this user {dataModal?.email}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDelete