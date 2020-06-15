import React from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'

const PageContainer = ({ title, ...props }) => {
  return (
    <>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Chat Example</NavbarBrand>
      </Navbar>
      <Container {...props} />
    </>
  )
}

export default PageContainer
