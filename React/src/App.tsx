import axios from "axios";
import { useEffect, useState } from "react"
import ListWallets from "./Components/ListWallts";
import Greeting from "./Components/Greeting";
import ListAsset from "./Components/Card";

function App() {
  const [listAsset, setListAsset] = useState<any>();

  useEffect(() => {
    const start = async () => {
      const response: any = await axios.get("http://localhost:3000/blocks");
      const output = response.data;
      const assetAsset = new Map<string, { category: string, quantity: number, amount: number, price: number}>;
      for (const block of output) {
        const asset = block.asset
        if (!asset) continue;
        if (!assetAsset.has(asset.name)) {
          assetAsset.set(asset.name, 
            { category: asset.category, quantity: asset.quantity, amount: (asset.price * asset.quantity), price: asset.price});
          continue;
        };
        const assetExist = assetAsset.get(asset.name);
        if(!assetExist) continue;
        const quantity = assetExist.quantity + asset.quantity;
        const amount = assetExist.amount + (asset.price * asset.quantity);
        const price = amount / quantity;
        assetAsset.set(asset.name, {quantity, amount, price, category: assetExist.category});
      } 
      const assetCategory = new Map<string, { quantity: number, amount: number, price: number}>;
      for (const category in assetAsset) {
        
      }
      setListAsset(assetAsset);
      // console.log(assetAsset);
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
              <ListWallets wallets={["Wallet X", "Wallet Y", "Wallet Z"]}/>
              
              {/* Saudação */}
              <Greeting name={"Fulano"} />

              {/* Card */}
              {
                listAsset ? 
                  <ListAsset listAsset={listAsset} />
                : <p className="text-center mt-3">Nenhum item encontrado</p>
              }
              
            </div>
          </div>

          {/* Barra Fixa no Final do Mesmo Tamanho do Card */}
          <div className="w-50 position-fixed bottom-0 bg-white py-2 border rounded d-flex justify-content-around mb-3">
            <img src="/home.png" style={styles.img} alt="Home" />
            <img src="/add.png" style={styles.img} alt="Add" />
            <img src="/chart.png" style={styles.img} alt="Chart" />
          </div>
        </div>
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