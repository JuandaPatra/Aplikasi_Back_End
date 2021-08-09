import React from "react";
import { Modal, FormControl, Button , Toast, ToastContainer} from "react-bootstrap";
import {connect} from "react-redux"
import {SendNewPassword} from "../redux/actions"

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      tos: false,
    };
  }

  onSendNewPassword = () => {
    let email = this.refs.inputEmail.value;
    let password = this.refs.newPassword.value;
    let repasword = this.refs.checkNewPasswords.value;

    if (password !== repasword) return this.setState({ tos: true })

    let data ={
      email,
      password
    }

    this.props.SendNewPassword(data)




  };
  render() {
    return (
      <div>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.modal}>
          <Modal.Header>
            <Modal.Title>Change your Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Input Your Email</p>
            <FormControl placeholder="Input Email" ref="inputEmail" />
            <p>Input new Password</p>
            <FormControl placeholder="Input New Password" ref="newPassword" />
            <p>Re-Input new Password</p>
            <FormControl placeholder="Input New Password" ref="checkNewPasswords" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onSendNewPassword} variant="primary">
              Input New Password
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer position="top-center">
        <Toast show={this.state.tos} >
          <Toast.Header closeButton={()=>this.setState({tos:false})}>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Password dan konfirmasi Password tidak sesuai</Toast.Body>
        </Toast>

        </ToastContainer>

      </div>
    );
  }
}

export default connect(null, {SendNewPassword}) (ChangePassword);
