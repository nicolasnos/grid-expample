import { AgGridReact } from "ag-grid-react"
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import './App.css'

import 'ag-grid-community/dist/styles/ag-grid.css'
import  'ag-grid-community/dist/styles/ag-theme-alpine.css'

function App() {
    const gridRef = useRef()

    const [rowData, setRowData] = useState ([
        {make: "ford", model: "2015", price: "$150.000.000"},
        {make: "toyota", model: "2019", price: "$200.000.000"},
        {make: "renault", model: "2018", price: "$30.000.000"},
        {make: "chevrolete", model: "2016", price: "$25.000.000"}
    ])

    const [columnDefs, setColumnDefs] = useState ([
        {field: "make"},
        {field: "model"},
        {field: "price"}
    ] )

    const defaultColDef = useMemo( () => ({
        sortable: true, 
        filter: true
    }), [])
    useEffect (() => {
        fetch('https://www.ag-grid.com/example/assets/row-data.js')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, [])

    const deseleccionar = useCallback( e  => {
        gridRef.current.api.deselectAll()
        
    })
    
    return (
        <div>
        <button className="unselect" onClick={deseleccionar}>quitar seleccion</button>
        <div className="ag-theme-alpine">
        
            
            <AgGridReact
            ref={gridRef}
            rowData={rowData}
            rowSelection="multiple"
            animateRows={true}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef} />
            
        </div>
        </div>
    )
}

export default App