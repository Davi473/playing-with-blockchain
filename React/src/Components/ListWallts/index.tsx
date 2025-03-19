import { useState } from "react"

function ListWallets(props: any) {
  const [listWallets] = useState<any[]>(props.wallets);

  return (
    <>
        <div>
            <select className="form-select text-center" aria-label="Default select example">
                {
                    listWallets.map(wallet => <option value="1">{wallet}</option>)
                }
            </select>
        </div>
    </>
  )
}

export default ListWallets;
