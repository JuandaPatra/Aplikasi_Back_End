import React from "react";
import { Table, Button, FormControl, Form, Dropdown, Toast, ToastContainer, Alert } from "react-bootstrap";
import NavigationBar from "../Components/navigation";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const URL_API = "http://localhost:2000/product";
// const URL_API = "http://localhost:2000/";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      idEdit: null,
      toggle: false,
      toggle1: false,
      toggle2: false,
      toast: false,
      notifalert : false
    };
  }
  fetchData = () => {
    axios
      .get(`${URL_API}/getProduct`)
      .then((res) => {
        console.log(res.data);
        this.setState({ products: res.data });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    axios
      .get(`${URL_API}/getProduct`)
      .then((res) => {
        console.log(res.data);
        this.setState({ products: res.data });
      })
      .catch((err) => console.log(err));
  }
  onDelete = (id) => {
    console.log(id);
    axios.delete(`${URL_API}deleteData/${id}`).then((res) => {
      this.setState({ products: res.data });
      this.setState({notifalert:true})


    });
  };

  onSave = (id) => {
    const name = this.refs.name.value;
    const price = +this.refs.price.value;
    const quantity = +this.refs.quantity.value;
    const data = {
      name,
      price,
      quantity,
    };
    axios
      .patch(`${URL_API}/patchProduct/${id}`, data)
      .then((res) => {
        this.setState({ products: res.data, idEdit: null, toast: true });
      })
      .catch((err) => console.log(err));
  };
  renderTHead = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Product price</th>
          <th>Product Quantity</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };
  renderTBody = () => {
    return (
      <tbody>
        {this.state.products.map((item, index) => {
          if (this.state.idEdit === item.idproducts) {
            return (
              <tr>
                <td>
                  <Form.Control ref="name" type="text" defaultValue={item.name} />
                </td>
                <td>
                  <Form.Control ref="price" type="number" defaultValue={item.price} />
                </td>
                <td>
                  <Form.Control ref="quantity" type="number" defaultValue={item.quantity} />
                </td>
                <td>
                  {" "}
                  <Button variant="success" onClick={() => this.onSave(item.idproducts)}>
                    Save
                  </Button>
                </td>
                <td>
                  {" "}
                  <Button variant="danger" onClick={() => this.setState({ idEdit: 0 })}>
                    cancel
                  </Button>
                </td>
              </tr>
            );
          }
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <Button variant="primary" onClick={() => this.setState({ idEdit: item.idproducts })} style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => this.onDelete(item._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  onSubmit = () => {
    const name = this.refs.name.value;
    const price = +this.refs.price.value;
    const quantity = +this.refs.quantity.value;
    const category = this.refs.category.value;
    const data = {
      name,
      price,
      quantity,
      category,
    };
    // console.log(data)
    axios
      .post(`${URL_API}addData`, data)
      .then((res) => {
        // this.fetchData()
        this.setState({ products: res.data });
        this.refs.name.value = "";
        this.refs.price.value = "";
        this.refs.quantity.value = "";
        this.refs.category.value = "";
      })
      .catch((err) => console.log(err));
  };

  renderTInput = () => {
    return (
      <tfoot>
        <tr>
          <td>
            <Form.Control ref="name" type="text" placeholder="Enter name" />
          </td>
          <td>
            <Form.Control ref="price" type="number" placeholder="Enter price" />
          </td>
          <td>
            <Form.Control ref="quantity" type="number" placeholder="Enter quantity" />
          </td>
          <Form.Select aria-label="Default select example" ref="category">
            <option>Choose Category</option>
            <option value="ATK">ATK</option>
            <option value="Bodycare">Bodycare</option>
            <option value="Food">Food</option>
          </Form.Select>
          <td>
            {" "}
            <Button variant="success" onClick={this.onSubmit}>
              Submit
            </Button>
          </td>
        </tr>
      </tfoot>
    );
  };

  onSortByName = () => {
    axios.get(`${URL_API}/sortByName`).then((res) => {
      this.setState({ products: res.data });
      this.setState({ toggle: false });
    });
  };

  onSortByNameZA = () => {
    axios.get(`${URL_API}/sortByNameZA`).then((res) => {
      this.setState({ products: res.data });
      this.setState({ toggle: true });
    });
  };

  onSortByPrice = () => {
    axios.get(`${URL_API}/sortByPrice`).then((res) => {
      this.setState({ products: res.data });
      this.setState({ toggle1: false });
    });
  };
  onSortByPriceZA = () => {
    axios.get(`${URL_API}/sortByPriceZA`).then((res) => {
      this.setState({ products: res.data });
      this.setState({ toggle1: true });
    });
  };

  onSortByQuantity = () => {
    axios.get(`${URL_API}/sortByQuantity`).then((res) => {
      this.setState({ products: res.data });
      this.setState({ toggle2: false });
    });
  };

  onSortByQuantityZA = () => {
    axios.get(`${URL_API}/sortByQuantityZA`).then((res) => {
      this.setState({ products: res.data });
      this.setState({ toggle2: true });
    });
  };

  render() {
    if(!this.props.username){
        return <Redirect to="/login" />
    }
    return (
      <div>
        <NavigationBar />
        <h1 style={{ textAlign: "center" }}>CRUD PRODUCT</h1>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sorting By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onSortByName}>Name</Dropdown.Item>
              {/* <Dropdown.Item onClick={this.onSortByNameZA} >Name Z - A</Dropdown.Item> */}

              <Dropdown.Item onClick={this.onSortByPrice}>Price</Dropdown.Item>
              <Dropdown.Item onClick={this.onSortByQuantity}>Quantity</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            {this.state.toggle ? (
              <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={this.onSortByName}>
                (Z-A)
              </Dropdown.Toggle>
            ) : (
              <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={this.onSortByNameZA}>
                (A-Z)
              </Dropdown.Toggle>
            )}
            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            {this.state.toggle1 ? (
              <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={this.onSortByPrice}>
                Price (9-1)
              </Dropdown.Toggle>
            ) : (
              <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={this.onSortByPriceZA}>
                Price (1-9)
              </Dropdown.Toggle>
            )}
            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            {this.state.toggle2 ? (
              <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={this.onSortByQuantity}>
                Quantity(1 -9)
              </Dropdown.Toggle>
            ) : (
              <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={this.onSortByQuantityZA}>
                Quantity (9 -1)
              </Dropdown.Toggle>
            )}
            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={{ margin: "30px" }}>
          <Table striped bordered hover size="sm">
            {this.renderTHead()}
            {this.renderTBody()}
            {this.renderTInput()}
          </Table>
        </div>
        {/* <Button/> */}
        <ToastContainer position={"top-center"}>
          <Toast show={this.state.toast} onClose={() => this.setState({ toast: false })}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">Bootstrap</strong>
              {/* <small>11 mins ago</small> */}
            </Toast.Header>
            <Toast.Body>data berhasil di update</Toast.Body>
          </Toast>
        </ToastContainer>

        <Alert show={this.state.notifalert} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.setState({notifalert : false})} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};
export default connect(mapStateToProps)(HomePage);
