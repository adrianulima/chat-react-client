import React from 'react'
import { Row, Col, Button, Card, CardBody } from 'reactstrap'
import {
  BsFillLockFill,
  BsFillUnlockFill,
  BsPencil,
  BsTrash,
} from 'react-icons/bs'

const RoomCard = ({
  roomId,
  isProtected,
  usersCount,
  size,
  onClickRoomId,
  onClickDelete,
  onClickEdit,
}) => (
  <Card className="bg-light room-id">
    <CardBody className="px-2 pt-1 pb-0">
      <Row>
        <Col>
          <span onClick={onClickRoomId}>{roomId}</span>
        </Col>
        <Col className="text-right">
          {isProtected ? (
            <BsFillLockFill size="16px" />
          ) : (
            <BsFillUnlockFill color="gray" size="16px" />
          )}
        </Col>
      </Row>
    </CardBody>
    <Row className="p-1 pl-2">
      <Col className="d-flex align-items-center">
        Users: {usersCount}/{size}
      </Col>
      <Col className="text-right">
        <Button
          outline
          color="danger"
          onClick={onClickDelete}
          size="sm"
          className="ml-2 border-0"
        >
          <BsTrash />
        </Button>
        <Button
          outline
          color="primary"
          onClick={onClickEdit}
          size="sm"
          className="ml-2 border-0"
        >
          <BsPencil />
        </Button>
      </Col>
    </Row>
  </Card>
)

export default RoomCard
