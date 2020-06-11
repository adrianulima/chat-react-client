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

const RoomsListPage = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const toggle = () => setIsNewModalOpen(!isNewModalOpen)

  return (
    <Container>
      <Row className="float-right">
        <Col>
          <Button color="primary" onClick={toggle}>
            New room
          </Button>
          <Modal isOpen={isNewModalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Room</ModalHeader>
            <ModalBody>Form</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Container>
  )
}

export default RoomsListPage
