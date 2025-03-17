import axios from "axios";
import React from "react";
import { useEffect, useState } from "react"

function App() {
  const [listStock, setListStock] = useState<any>();

  useEffect(() => {
    const start = async () => {
      const response: any = await axios.get("http://localhost:3000/blocks");
      const output = response.data;
      console.log(output);
      const stockUser = new Map<string, { quantity: number, amount: number, price: number}>;
      for (const block of output) {
        const stock = block.asset
        if (!stock) continue;
        if (!stockUser.has(stock.name)) {
          stockUser.set(stock.name, 
            {quantity: stock.quantity, amount: (stock.price * stock.quantity), price: stock.price});
          continue;
        };
        const stockExist = stockUser.get(stock.name);
        if(!stockExist) continue;
        const quantity = stockExist.quantity + stock.quantity;
        const amount = stockExist.amount + (stock.price * stock.quantity);
        const price = amount / quantity;
        stockUser.set(stock.name, {quantity, amount, price});
      } 
      setListStock(stockUser);
      console.log(stockUser);
    };
    start()
  }, []);

  return (
    <>
      {
        listStock && listStock.size > 0 ? (
          [...listStock].map(([key, value]) => (
            <React.Fragment key={key}>
              <p>RET</p>
              <p>{key}</p>
              <p>quantity</p>
              <p>{value.quantity}</p>
              <p>amount</p>
              <p>{value.amount}</p>
              <div className="list-group vh-100 d-flex justify-content-center align-items-center">
                <button className="list-group-item list-group-item-action active">
                  The current link item
                </button>
                <button className="list-group-item list-group-item-action">A second link item</button>
                <button className="list-group-item list-group-item-action">A third link item</button>
                <button className="list-group-item list-group-item-action">A fourth link item</button>
                <button className="list-group-item list-group-item-action disabled">A disabled link item</button>
              </div>
            </React.Fragment>
          ))
        ) : (
          <p>Nenhum item encontrado</p>
        )
      }
    </>
  )
}

export default App;