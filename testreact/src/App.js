import react, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Modal,
    Container,
    Row,
    Col,
    Form
} from "react-bootstrap";

function App() {
    const URL_API = process.env.REACT_APP_URL_API;
    const [showModal, setshowModal] = useState(false);
    const [isAdd, setisAdd] = useState(false);
    const [platos, setplatos] = useState([]);
    const [id, setid] = useState("");
    const [color, setcolor] = useState("");
    const [campos, setcampos] = useState("");
    const [precio, setprecio] = useState("");
    const [nombre, setnombre] = useState("");
    const [fechainicioactividad, setfechainicioactividad] = useState("");
    const [oferta, setoferta] = useState("");

    const getData = () => {
        fetch(`${URL_API}api/plates`)
            .then((res) => res.json())
            .then((res) => setplatos(res));
    };
    useEffect(() => {
        getData();
    }, []);

    const validations = () => {
        if (Number(precio) < 9 || Number(precio) > 25) {
            alert("El precio del plato debe estar entre 9$ y 25$");
            return false;
        }
        if (nombre.length < 2) {
            alert("El nombre del plato debe tener minimo 2 palabras");
            return false;
        }
    };
    const add = () => {
        validations();
        fetch(`${URL_API}api/plates/add`, {
            method: "POST",
            body: JSON.stringify({
                color,
                campos,
                precio,
                nombre,
                fechainicioactividad,
                oferta
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                alert("Plato agregado exitosamente");
                setshowModal(false);
                setisAdd(false);
            })
            .finally(() => getData());
    };
    const showModalUpdate = (e) => {
        setid(e._id);
        setcolor(e.color);
        setcampos(e.campos);
        setprecio(e.precio);
        setnombre(e.nombre);
        setfechainicioactividad(e.fechainicioactividad);
        setoferta(e.oferta);
        setshowModal(true);
        setisAdd(false);
    };
    const update = () => {
        validations();
        fetch(`${URL_API}api/plates/update`, {
            method: "PUT",
            body: JSON.stringify({
                id,
                color,
                campos,
                precio,
                nombre,
                fechainicioactividad,
                oferta
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                alert("Plato Actualizado exitosamente");
                setshowModal(false);
            })
            .finally(() => getData());
    };
    const remove = (e) => {
        fetch(`${URL_API}api/plates/delete/${e._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                alert("Plato eliminado exitosamente");
                setshowModal(false);
            })
            .finally(() => getData());
    };
    return (
        <div className='App'>
            <Container>
                <Row style={{ marginTop: "20px" }}>
                    <Col>
                        <Button
                            onClick={() => {
                                setshowModal(true);
                                setisAdd(true);
                            }}>
                            Agregar plato
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>nombre</th>
                                    <th>color</th>
                                    <th>campos</th>
                                    <th>precio</th>
                                    <th>Fecha de inicio actividad</th>
                                    <th>Oferta Si/No</th>
                                    <th>Actualizar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {platos.map((e, i) => (
                                    <tr key={i}>
                                        <td>{e._id}</td>
                                        <td>{e.nombre}</td>
                                        <td>{e.color}</td>
                                        <td>{e.campos}</td>
                                        <td>{e.precio}</td>
                                        <td>{e.fechainicioactividad}</td>
                                        <td>{e.oferta}</td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    showModalUpdate(e)
                                                }>
                                                Actualizar
                                            </Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => remove(e)}>
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal show={showModal} onHide={() => setshowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Plato</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={color}
                                    onChange={(e) => setcolor(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={precio}
                                    onChange={(e) => setprecio(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Campos</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={campos}
                                    onChange={(e) => setcampos(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={nombre}
                                    onChange={(e) => setnombre(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Fecha inicio actividad</Form.Label>

                                <Form.Control
                                    type='datetime-local'
                                    value={fechainicioactividad
                                        .toString()
                                        .substring(
                                            0,
                                            fechainicioactividad.length - 1
                                        )}
                                    onChange={(e) =>
                                        setfechainicioactividad(e.target.value)
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Oferta</Form.Label>
                                <Form.Select
                                    value={oferta}
                                    onChange={(e) => setoferta(e.target.value)}>
                                    <option value='NO'>NO</option>
                                    <option value='SI'>SI</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant='primary'
                            onClick={() => (isAdd ? add() : update())}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}

export default App;
