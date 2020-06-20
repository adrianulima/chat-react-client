import React, { useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

const RoomForm = ({ size, onSizeChange, password, onPasswordChange }) => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false)
  return (
    <Form>
      <FormGroup>
        <Label for="sizeSelect">Size</Label>
        <Input
          type="select"
          name="sizeSelect"
          id="sizeSelect"
          value={size}
          onChange={(e) => {
            onSizeChange && onSizeChange(e.currentTarget.value)
          }}
        >
          <option>4</option>
          <option>8</option>
          <option>12</option>
          <option>16</option>
          <option>20</option>
          <option>24</option>
        </Input>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            onChange={(e) => {
              setIsPasswordEnabled(e.currentTarget.checked)
              if (!e.currentTarget.checked) {
                onPasswordChange && onPasswordChange('')
              }
            }}
          />
          Has password?
        </Label>
      </FormGroup>
      {isPasswordEnabled && (
        <FormGroup className="mt-3">
          <Label for="passwordInput">Password</Label>
          <Input
            type="password"
            name="passwordInput"
            id="passwordInput"
            value={password}
            onChange={(e) => {
              onPasswordChange && onPasswordChange(e.currentTarget.value)
            }}
          />
        </FormGroup>
      )}
    </Form>
  )
}

export default RoomForm
