import React, { useState, useEffect } from 'react'
import PageContainer from './PageContainer'
import { Row, Col, Button, Card, CardBody } from 'reactstrap'
import {
  BsFillLockFill,
  BsFillUnlockFill,
  BsPencil,
  BsTrash,
} from 'react-icons/bs'
import ModalNewRoom from './components/modals/ModalNewRoom'
import ModalDeleteRoom from './components/modals/ModalDeleteRoom'
import { map } from 'lodash'
import { ChatApiHandler } from 'chat-react-client'

const chatApi = ChatApiHandler()

const RoomsListPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const toggleNew = () => setIsNewModalOpen(!isNewModalOpen)
  const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen)
  const toggleEdit = () => setIsEditModalOpen(!isEditModalOpen)

  const [currentRoomSize, setCurrentRoomSize] = useState('4')
  const [currentRoomPassword, setCurrentRoomPassword] = useState('')
  const [currentRoomId, setCurrentRoomId] = useState('')

  const [roomsList, setRoomsList] = useState([])

  useEffect(() => {
    updateRooms()
  }, [])

  const createRoom = () => {
    const newRoom = { size: currentRoomSize }
    if (currentRoomPassword) newRoom.password = currentRoomPassword
    chatApi.postRoom(newRoom).then(() => updateRooms())

    setIsNewModalOpen(false)
    setCurrentRoomSize('4')
    setCurrentRoomPassword('')
  }

  const updateRooms = () =>
    chatApi.getRooms().then((rooms) => {
      setRoomsList(rooms.list)
    })

  const deleteRoom = () => {
    chatApi.deleteRoom(currentRoomId).then(() => updateRooms())

    setIsDeleteModalOpen(false)
    setCurrentRoomId('')
  }

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
            onSubmit={createRoom}
          />
        </Col>
      </Row>

      <>
        <ModalDeleteRoom
          isOpen={isDeleteModalOpen}
          toggle={toggleDelete}
          roomId={currentRoomId}
          onSubmit={deleteRoom}
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
            setCurrentRoomSize('4')
            setCurrentRoomPassword('')
            setCurrentRoomId('')
          }}
        />
      </>
      <Row>
        {map(roomsList, (room) => {
          return (
            <Col key={room.roomId} lg="4" md="6" sm="12" className="mb-4">
              <Card className="bg-light">
                <CardBody className="p-2">
                  <Row>
                    <Col>
                      <h4 className="m-0">#{room.roomId}</h4>
                    </Col>
                    <Col className="text-right">
                      {room.protected ? (
                        <BsFillLockFill size="16px" />
                      ) : (
                        <BsFillUnlockFill color="gray" size="16px" />
                      )}
                    </Col>
                  </Row>
                </CardBody>
                <Row className="p-1 pl-2">
                  <Col className="d-flex align-items-center">
                    Users: {room.usersCount}/{room.size}
                  </Col>
                  <Col className="text-right">
                    <Button
                      outline
                      color="danger"
                      onClick={() => {
                        setCurrentRoomId(room.roomId)
                        toggleDelete()
                      }}
                      size="sm"
                      className="ml-2 border-0"
                    >
                      <BsTrash />
                    </Button>
                    <Button
                      outline
                      color="primary"
                      onClick={() => {
                        // TODO: get password from API
                        setCurrentRoomPassword(room.password)
                        setCurrentRoomSize(room.size)
                        setCurrentRoomId(room.roomId)
                        toggleEdit()
                      }}
                      size="sm"
                      className="ml-2 border-0"
                    >
                      <BsPencil />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          )
        })}
      </Row>
    </PageContainer>
  )
}

export default RoomsListPage
