import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import RoomForm from './components/RoomForm'

const RoomsListPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const toggle = () => setIsNewModalOpen(!isNewModalOpen)
  const [currentRoomSize, setCurrentRoomSize] = useState('10')
  const [currentRoomPassword, setCurrentRoomPassword] = useState('')
  const submitNewRoom = () => {
    // console.log({
    //   size: currentRoomSize,
    //   password: currentRoomPassword !== '' ? currentRoomPassword : undefined,
    // })
    setIsNewModalOpen(false)
    setCurrentRoomSize('10')
    setCurrentRoomPassword('')
  }

  return (
    <Container>
      <Row className="float-right">
        <Col>
          <Button color="primary" onClick={toggle}>
            New room
          </Button>
          <Modal isOpen={isNewModalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Room</ModalHeader>
            <ModalBody>
              <RoomForm
                size={currentRoomSize}
                password={currentRoomPassword}
                onSizeChange={setCurrentRoomSize}
                onPasswordChange={setCurrentRoomPassword}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={submitNewRoom}>
                Create
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Container>
  )
}

export default RoomsListPage
