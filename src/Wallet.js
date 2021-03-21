import React, { useEffect, useState } from 'react'
import { SendDogo } from './components/SendDogo';
import { getTransactions } from './helpers/WalletProvider';
import './Wallet.css';


export const Wallet = ({user}) => {

    const [transactions, setTransactions] = useState([]);

    useEffect ( () =>{
        //Recupero de BBDD transacciones con mi provider
        getTransactions(user.email)
            .then(
                data => {
                    setTransactions(data);
                });
    },[user.email]);

    return (
        <div className="App">
            <h1>Bienvenido, {user.email}</h1>
            <br/>
            {/* Formulario para enviar dogocoins*/}
            <SendDogo setTransactions={setTransactions} fromMail={user.email}/>

            <div className="row-trans">
                {
                    transactions.map ( (transaction) => (

                        <div className="flexbox-container" key ={transaction.date}>
                            <div className="flexbox-item flexbox-item-1">
                                <h4>{transaction.tipo}:</h4><p>{transaction.emailtrans}</p>
                                <p>Fecha, {transaction.date}</p>
                            </div>
                            <div className="flexbox-item flexbox-item-2">
                                <h4>Cantidad</h4>
                                <p>{transaction.trans} DOGE</p>
                            </div>
                        </div>



                    ))
                }
            </div>
        </div>
    )
}
