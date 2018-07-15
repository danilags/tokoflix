import React from 'react';
import {
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const ModalText = (props) => (
  <Modal isOpen={props.isOpen} toggle={props.onToggle}>
    <ModalHeader toggle={props.toggle}>Guest</ModalHeader>
      <ModalBody>
        {
          props.isLogged ? <Button onClick={() => props.onLogout()}>Keluar</Button> :
          <Form onSubmit={props.onSubmitData}>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input 
                onChange={props.onChangesName}
                type="text" 
                name="name" 
                placeholder="Your name"
              />
            </FormGroup>
            <Button disabled={props.isLoading}>
              {props.isLoading ? 'Loading...' : 'Masuk'}
            </Button>
          </Form>
        }
      </ModalBody>
  </Modal>
)

export default ModalText;