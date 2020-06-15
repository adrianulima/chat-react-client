import React, { useState } from 'react'
import PageContainer from './PageContainer'
import {
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
} from 'reactstrap'
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs'
import ModalNewRoom from './components/modals/ModalNewRoom'
import ModalDeleteRoom from './components/modals/ModalDeleteRoom'
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const toggleNew = () => setIsNewModalOpen(!isNewModalOpen)
  const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen)
  const toggleEdit = () => setIsEditModalOpen(!isEditModalOpen)

  const [currentRoomSize, setCurrentRoomSize] = useState('10')
  const [currentRoomPassword, setCurrentRoomPassword] = useState('')
  const [currentRoomId, setCurrentRoomId] = useState('')

  return (
    <PageContainer>
      <Row className="my-4">
        <Col>
          <h2>Rooms List</h2>
        </Col>
        <Col className="text-right">
          <Button color="primary" onClick={toggleNew}>
            New room
          </Button>
          <ModalNewRoom
            isOpen={isNewModalOpen}
            toggle={toggleNew}
            size={currentRoomSize}
            password={currentRoomPassword}
            onSizeChange={setCurrentRoomSize}
            onPasswordChange={setCurrentRoomPassword}
            onSubmit={() => {
              // console.log({
              //   size: currentRoomSize,
              //   password: currentRoomPassword !== '' ? currentRoomPassword : undefined,
              // })
              setIsNewModalOpen(false)
              setCurrentRoomSize('10')
              setCurrentRoomPassword('')
            }}
          />
        </Col>
      </Row>

      <>
        <ModalDeleteRoom
          isOpen={isDeleteModalOpen}
          toggle={toggleDelete}
          roomId={currentRoomId}
          onSubmit={(roomId) => {
            // console.log('delete: ', roomId)
            setIsDeleteModalOpen(false)
            setCurrentRoomId('')
          }}
        />
        <ModalNewRoom
          isOpen={isEditModalOpen}
          toggle={toggleEdit}
          size={currentRoomSize}
          password={currentRoomPassword}
          roomId={currentRoomId}
          onSizeChange={setCurrentRoomSize}
          onPasswordChange={setCurrentRoomPassword}
          onSubmit={() => {
            // console.log({
            //   size: currentRoomSize,
            //   password:
            //     currentRoomPassword !== '' ? currentRoomPassword : undefined,
            //   roomId: currentRoomId,
            // })
            setIsEditModalOpen(false)
            setCurrentRoomSize('10')
            setCurrentRoomPassword('')
            setCurrentRoomId('')
          }}
        />
      </>
      <Row>
        {map(rooms, (room) => {
          return (
            <Col key={room.roomId} lg="4" md="6" sm="12" className="mb-4">
              <Card style={{ height: 170 }}>
                <CardBody>
                  <CardTitle>#{room.roomId}</CardTitle>
                  <CardText
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {room.users.length}/{room.size}
                    {room.protected ? (
                      <BsFillLockFill size="20px" />
                    ) : (
                      <BsFillUnlockFill size="20px" />
                    )}
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <Button
                    outline
                    color="danger"
                    onClick={() => {
                      setCurrentRoomId(room.roomId)
                      toggleDelete()
                    }}
                    size="sm"
                  >
                    Delete
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    onClick={() => {
                      // TODO: get password from API
                      setCurrentRoomPassword(room.password)
                      setCurrentRoomSize(room.size)
                      setCurrentRoomId(room.roomId)
                      toggleEdit()
                    }}
                    size="sm"
                    className="ml-2"
                  >
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          )
        })}
      </Row>
    </PageContainer>
  )
}

export default RoomsListPage
