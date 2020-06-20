import React from 'react'
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap'

const ModalDeleteRoom = ({ isOpen, toggle, roomId, onSubmit }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Delete Room {roomId}?</ModalHeader>
    <ModalFooter>
      <Button color="danger" onClick={() => onSubmit(roomId)}>
        Confirm
      </Button>
    </ModalFooter>
  </Modal>
)

export default ModalDeleteRoom
