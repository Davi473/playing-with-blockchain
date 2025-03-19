import React from "react";
import { useState } from "react"

function ListAsset(props: any) {
    const [listAsset] = useState<any[]>(props.listAsset);
    return (
    <>
        <div>
            {
                [...listAsset].map(([key, value]) => (
                    <React.Fragment key={key}>
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
                    </React.Fragment>
                ))
            }
        </div>
    </>
  )
}

export default ListAsset;
