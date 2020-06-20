import React from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'

const PageContainer = ({ title, ...props }) => (
  <>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Chat Example</NavbarBrand>
    </Navbar>
    <Container {...props} />
  </>
)

export default PageContainer
