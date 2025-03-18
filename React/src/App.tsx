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
      <div className="position-relative min-vh-100 d-flex flex-column bg-light">
        <div className="d-flex flex-column align-items-center min-vh-100 bg-light">
          {/* Conteúdo Principal */}
          <div className="w-50 mt-3">
            <div className="mb-5">
              {/* Select */}
              <div>
                <select className="form-select text-center" aria-label="Default select example">
                  <option value="1">Wallet X</option>
                  <option value="2">Wallet Y</option>
                  <option value="3">Wallet Z</option>
                </select>
              </div>

              {/* Saudação */}
              <div className="mt-5 mb-5">
                <h2>
                  <p className="h6">Bom dia</p>
                  Fulano
                </h2>
              </div>

              {/* Card */}
              <div className="form-control mb-3">
                <div className="row g-3">
                  <div className="col-md-2">
                    <label className="form-label">Ret</label>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">(1 Asset)</label>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end">
                    <button type="button" className="btn active" data-bs-toggle="button" >Mostrar</button>
                  </div>
                  <div className="col-md-6 text-center">
                    <p className="opacity-50">Valor Aplicado</p>
                    <p>123</p>
                  </div>
                  <div className="col-md-6 text-center">
                    <p className="opacity-50">% na Carteira</p>
                    <p>50%</p>
                  </div>
                </div>
              </div>

              <div className="form-control mb-3">
                <div className="row g-3">
                  <div className="col-md-2">
                    <label className="form-label">Ret</label>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">(1 Asset)</label>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end">
                    <button type="button" className="btn active" data-bs-toggle="button" >Mostrar</button>
                  </div>
                  <div className="col-md-6 text-center">
                    <p className="opacity-50">Valor Aplicado</p>
                    <p>123</p>
                  </div>
                  <div className="col-md-6 text-center">
                    <p className="opacity-50">% na Carteira</p>
                    <p>50%</p>
                  </div>
                </div>
              </div>

              <div className="form-control mb-3">
                <div className="row g-3">
                  <div className="col-md-2">
                    <label className="form-label">Ret</label>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">(1 Asset)</label>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end">
                    <button type="button" className="btn active" data-bs-toggle="button" >Mostrar</button>
                  </div>
                  <div className="col-md-6 text-center">
                    <p className="opacity-50">Valor Aplicado</p>
                    <p>123</p>
                  </div>
                  <div className="col-md-6 text-center">
                    <p className="opacity-50">% na Carteira</p>
                    <p>50%</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Barra Fixa no Final do Mesmo Tamanho do Card */}
          <div className="w-50 position-fixed bottom-0 bg-white py-2 border rounded d-flex justify-content-around mb-3">
            <img src="/home.png" style={styles.img} alt="Home" />
            <img src="/add.png" style={styles.img} alt="Add" />
            <img src="/chart.png" style={styles.img} alt="Chart" />
          </div>
        </div>


        {listStock && listStock.size > 0 ? (
          [...listStock].map(([key, value]) => (
            <React.Fragment key={key}>
            </React.Fragment>
          ))
        ) : (
          <p className="text-center mt-3">Nenhum item encontrado</p>
        )}
      </div>
    </>
  )
}

export default App;

const styles = {
  img: {
    width: "40px",
    height: "40px"
  }
}