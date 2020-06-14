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
  CardText,
} from 'reactstrap'
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs'
import RoomForm from './components/RoomForm'

import { map } from 'lodash'

const rooms = [
  { roomId: 1234, size: 6, users: ['1', '2'], protected: true },
  { roomId: 2345, size: 3, users: ['3'], protected: true },
  { roomId: 3456, size: 4, users: ['4'] },
  { roomId: 4567, size: 6, users: [] },
  { roomId: 5678, size: 6, users: [] },
  { roomId: 6789, size: 6, users: [] },
  { roomId: 7890, size: 6, users: [] },
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
        {map(rooms, (room) => {
          return (
            <Col key={room.roomId} lg="4" md="6" sm="12" className="mb-4">
              <Card style={{ height: 120 }}>
                <CardBody>
                  <CardTitle>#{room.roomId}</CardTitle>
                  <CardText
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {room.users.length}/{room.size}
                    {room.protected ? (
                      <BsFillLockFill size="20px" />
                    ) : (
                      <BsFillUnlockFill size="20px" />
                    )}
                  </CardText>
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
