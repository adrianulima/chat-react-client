import React, { useState, useEffect } from 'react'
import PageContainer from '../PageContainer'
import { Row, Col, Button } from 'reactstrap'
import ModalNewRoom from './modals/ModalNewRoom'
import ModalDeleteRoom from './modals/ModalDeleteRoom'
import { map } from 'lodash'
import { ChatApiHandler, apiErrorHandler } from 'chat-react-client'
import ModalEnterRoom from './modals/ModalEnterRoom'
import Chat from '../Chat'
import RoomCard from './RoomCard'

const chatApi = ChatApiHandler()
const defaultRoomSize = '4'

const RoomsListPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false)

  const toggleNew = () => setIsNewModalOpen(!isNewModalOpen)
  const toggleDelete = () => setIsDeleteModalOpen(!isDeleteModalOpen)
  const toggleEdit = () => setIsEditModalOpen(!isEditModalOpen)
  const toggleEnter = () => setIsEnterModalOpen(!isEnterModalOpen)

  const [currentRoomSize, setCurrentRoomSize] = useState(defaultRoomSize)
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
    setCurrentRoomSize(defaultRoomSize)
    setCurrentRoomPassword('')
  }

  const editRoom = () => {
    // TODO: Send edited room to API

    setIsEditModalOpen(false)
    setCurrentRoomSize(defaultRoomSize)
    setCurrentRoomPassword('')
    setCurrentRoomId('')
  }

  const updateRooms = () =>
    chatApi
      .getRooms()
      .then((rooms) => setRoomsList(rooms.list))
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
        updateRooms()
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

  const roomConnectModal = (room) => {
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
            onSubmit={editRoom}
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
              <RoomCard
                roomId={room.roomId}
                isProtected={room.protected}
                usersCount={room.usersCount}
                size={room.size}
                onClickRoomId={() => roomConnectModal(room)}
                onClickDelete={() => {
                  setCurrentRoomId(room.roomId)
                  toggleDelete()
                }}
                onClickEdit={() => {
                  // TODO: get password from API
                  setCurrentRoomPassword(room.password)
                  setCurrentRoomSize(room.size)
                  setCurrentRoomId(room.roomId)
                  toggleEdit()
                }}
              />
            </Col>
          ))}
        </Row>
      </PageContainer>
      {!!currentRoomChat && <Chat roomId={currentRoomChat} />}
    </>
  )
}

export default RoomsListPage
