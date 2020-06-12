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
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap'
import RoomForm from './components/RoomForm'

import { map } from 'lodash'

const idsRooms = [
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
  '#235561',
]

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
      <Row className="text-right">
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

      <Row className="mt-4">
        {map(idsRooms, (id) => {
          return (
            <Col lg="4" md="6" sm="12" className="mb-4">
              <Card style={{ height: 120 }}>
                <CardBody>
                  <CardTitle>{id}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default RoomsListPage
