import { useState } from "react"

function Greeting(props: any) {
  const [name] = useState<any[]>(props.name);

  return (
    <>
        <div className="mt-5 mb-5">
            <h2>
                <p className="h6">Bom dia</p>
                {name}
            </h2>
        </div>
    </>
  )
}

export default Greeting;
