import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { saveTransaction } from '../helpers/WalletProvider';
import '../Wallet.css';



export const SendDogo = ({setTransactions, fromMail} ) => {

    const [inputSend, setInputSend] = useState({trans: "", email: ""});
    const [submitSend, setSubmitSend] = useState(true);

    useEffect(() => {
        if (inputSend.trans > 0 && inputSend.email !== "") {
            setSubmitSend(false);

        } else {
            setSubmitSend(true);
        }
    }, [inputSend]);


    const handleChange = (e) => {
        setInputSend({...inputSend, [e.target.name]:e.target.value});
       
        // console.log(inputSend);
        // if (inputSend.trans > 0 && inputSend.trans !== "") setSubmitSend(false);
        
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        setInputSend({trans: "", email: ""});

        //Valores validados y correctos para enviar
        //Guardar en mongo
        const dateCreated = new Date().toLocaleString() + '';
        const fixInfo = {tipo:"Enviado", date: dateCreated};
        const infoForm = {...inputSend, ...fixInfo};
        const dataToSave = formatInfo(infoForm, fromMail)
        const isSave = saveInDatabase(dataToSave);
        //Si se ha guardado, actualizamos el listado
        if (isSave) setTransactions( trans => [dataToSave, ...trans]);
    };

//Formateamos con estructura de datos para el objeto de mongoDB
    const formatInfo = (data, fromMail) => {
        return {
            tipo: data.tipo, 
            emailid: fromMail, 
            emailtrans: data.email, 
            date: data.date, 
            trans: data.trans
        };
    };

    const saveInDatabase = (data) => {
        return saveTransaction(data);
    };

    return (

        <Container>
        <Form onChange={handleChange} onSubmit={handleSubmit}>
          <Row>
            <Col>
                <Form.Group controlId="formBasicNumber">
                <Form.Control name="trans" value={inputSend.trans} onChange={handleChange} type="number" step="0.01" min='0.01' max='9999.99' placeholder="Ejemplo: 123,45"  />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formBasicEmail">
                <Form.Control name="email" value={inputSend.email} onChange={handleChange} type="email" minLength="6" maxLength="64" placeholder="ejemplo@ejemplo.com"   />
                </Form.Group>
            </Col>
            <Row>
                <Col>
                    <Button value="Enviar" variant="primary" type="submit" disabled={submitSend}>Enviar</Button>
                </Col>
            </Row>
          </Row>
          
        </Form>
      </Container>

    )
}