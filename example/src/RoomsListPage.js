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
import { ChatApiHandler, apiErrorHandler } from 'chat-react-client'
import ModalEnterRoom from './components/modals/ModalEnterRoom'
import Chat from './Chat'

const chatApi = ChatApiHandler()

const RoomsListPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false)

  const toggleNew = () => setIsNewModalOpen(!isNewModalOpen)
  const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen)
  const toggleEdit = () => setIsEditModalOpen(!isEditModalOpen)
  const toggleEnter = () => setIsEnterModalOpen(!isEnterModalOpen)

  const [currentRoomSize, setCurrentRoomSize] = useState('4')
  const [currentRoomPassword, setCurrentRoomPassword] = useState('')
  const [currentRoomProtected, setCurrentRoomProtected] = useState(false)
  const [currentRoomId, setCurrentRoomId] = useState('')
  const [currentUserName, setCurrentUserName] = useState('')
  const [currentRoomChat, setCurrentRoomChat] = useState('')

  const [roomsList, setRoomsList] = useState([])

  useEffect(() => {
    updateRooms()
  }, [])

  const createRoom = () => {
    const newRoom = { size: currentRoomSize }
    if (currentRoomPassword) newRoom.password = currentRoomPassword
    chatApi
      .postRoom(newRoom)
      .then(() => updateRooms())
      .catch(apiErrorHandler)

    setIsNewModalOpen(false)
    setCurrentRoomSize('4')
    setCurrentRoomPassword('')
  }

  const updateRooms = () =>
    chatApi
      .getRooms()
      .then((rooms) => {
        setRoomsList(rooms.list)
      })
      .catch(apiErrorHandler)

  const enterRoom = () =>
    chatApi
      .postRoomUser(
        currentRoomId,
        { userName: currentUserName },
        { headers: { password: currentRoomPassword } }
      )
      .then((user) => {
        localStorage.setItem(
          currentRoomId,
          JSON.stringify({
            user,
            password: currentRoomPassword,
          })
        )
        setCurrentRoomChat(currentRoomId)
        setIsEnterModalOpen(false)
      })
      .catch(apiErrorHandler)

  const deleteRoom = () => {
    chatApi
      .deleteRoom(currentRoomId)
      .then(() => updateRooms())
      .catch(apiErrorHandler)

    setIsDeleteModalOpen(false)
    setCurrentRoomId('')
  }

  return (
    <>
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
          <ModalEnterRoom
            isOpen={isEnterModalOpen}
            toggle={toggleEnter}
            roomId={currentRoomId}
            userName={currentUserName}
            password={currentRoomPassword}
            onUsernameChange={setCurrentUserName}
            onPasswordChange={currentRoomProtected && setCurrentRoomPassword}
            onSubmit={enterRoom}
          />
        </>
        <Row>
          {map(roomsList, (room) => (
            <Col key={room.roomId} lg="4" md="6" sm="12" className="mb-4">
              <Card className="bg-light">
                <CardBody className="p-2">
                  <Row>
                    <Col>
                      <h4
                        className="m-0"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setCurrentRoomId(room.roomId)
                          setCurrentRoomProtected(room.protected)
                          const roomInfo = localStorage.getItem(room.roomId)
                          if (roomInfo) {
                            const roomObject = JSON.parse(roomInfo)
                            setCurrentRoomPassword(roomObject.password)
                            setCurrentUserName(roomObject.user.userName)
                          } else {
                            setCurrentUserName('')
                            setCurrentRoomPassword('')
                          }
                          toggleEnter()
                        }}
                      >
                        #{room.roomId}
                      </h4>
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
          ))}
        </Row>
      </PageContainer>
      {!!currentRoomChat && <Chat roomId={currentRoomChat} />}
    </>
  )
}

export default RoomsListPage
