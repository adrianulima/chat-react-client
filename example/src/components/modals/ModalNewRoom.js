import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import RoomForm from '../RoomForm'

const ModalNewRoom = ({
  isOpen,
  toggle,
  size,
  password,
  roomId,
  onSizeChange,
  onPasswordChange,
  onSubmit,
}) => {
  const isEdit = !!roomId
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isEdit ? `Edit room ${roomId}` : 'Create New Room'}
      </ModalHeader>
      <ModalBody>
        <RoomForm
          size={size}
          password={password}
          onSizeChange={onSizeChange}
          onPasswordChange={onPasswordChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSubmit(roomId)}>
          {isEdit ? 'Save' : 'Create'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalNewRoom
