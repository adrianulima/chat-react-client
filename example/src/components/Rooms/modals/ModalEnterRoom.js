import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

const ModalEnterRoom = ({
  isOpen,
  toggle,
  roomId,
  userName,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Enter into Room</ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Label for="userNameInput">Username</Label>
          <Input
            type="text"
            name="userNameInput"
            id="userNameInput"
            onChange={(e) => {
              onUsernameChange(e.currentTarget.value)
            }}
            value={userName}
          />
        </FormGroup>
        {onPasswordChange && (
          <FormGroup className="mt-3">
            <Label for="passwordInput">Room Password</Label>
            <Input
              type="password"
              name="passwordInput"
              id="passwordInput"
              onChange={(e) => {
                onPasswordChange(e.currentTarget.value)
              }}
              value={password}
            />
          </FormGroup>
        )}
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={() => onSubmit(roomId)}>
        Enter
      </Button>
    </ModalFooter>
  </Modal>
)

export default ModalEnterRoom
