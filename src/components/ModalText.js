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
          <Button>Masuk</Button>
        </Form>
      </ModalBody>
  </Modal>
)

export default ModalText;