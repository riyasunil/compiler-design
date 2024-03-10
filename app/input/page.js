"use client"
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { RxDividerVertical } from "react-icons/rx";

export default function page() {
    const [rows, setRows] = useState([{ id: 1, colCount: 1 }]);
    const [fields, setFields] = useState([{ id: 1, rowId: 1, value: '', }]);

    // const [prods, setProds] = useState({ rowID: "", head: "", tail: [] });
    const [prods, setProds] = useState([]);

    const [inputString, setInputString] = useState("")


    const handleAddField = (rowIndex) => {
        const newId = fields.length + 1;
        const rowId = rows[rowIndex].id; // Get the row id
        setFields([...fields, { id: newId, rowId: rowId, value: '' }]); // Include the row id for the new field
        const updatedRows = [...rows];
        updatedRows[rowIndex].colCount += 1;
        setRows(updatedRows);
    };
    const handleAddRow = () => {
        const newId = rows.length + 1;
        setRows([...rows, { id: newId, colCount: 1 }]);
        setFields([...fields, { id: (fields.length + 1), rowId: newId, value: '' }]);
        setProds([...prods, { rowID: newId, head: '', tail: [] }]);
    };

    const logFieldsByRowId = () => {
        rows.forEach(row => {
            const fieldsByRowId = fields.filter(field => field.rowId === row.id);
            console.log(`Row ID: ${row.id}, Number of Fields: ${fieldsByRowId.length}`);
            fieldsByRowId.forEach(field => {
                console.log(`Field ID: ${field.id}`);
            });
        });
    };

    // const handleHeadChange = (value, rowIndex) => {
    //     const updatedProds = { ...prods };
    //     updatedProds.rowID = rows[rowIndex].id; // Set the row ID
    //     updatedProds.head = value; // Set the head value
    //     setProds(updatedProds);
    // };
    const handleHeadChange = (value, rowIndex) => {
        const updatedProds = [...prods];
        const rowId = rows[rowIndex].id;
        const prodIndex = updatedProds.findIndex(prod => prod.rowID === rowId);
        if (prodIndex !== -1) {
            updatedProds[prodIndex].head = value;
        } else {
            updatedProds.push({ rowID: rowId, head: value, tail: [] });
        }
        setProds(updatedProds);
    };

    // const handleTailChange = (value, rowIndex) => {
    //     const updatedProds = { ...prods };
    //     const rowId = rows[rowIndex].id;
    //     const tailIndex = fields.filter(field => field.rowId === rowId).length; // Get the index for the new tail value
    //     updatedProds.tail[rowIndex] = { rowId: rowId, value: value };
    //     setProds(updatedProds);
    // };
    const handleTailChange = (value, rowIndex) => {
        if (value == "empty") {
            console.log("hi")
        }
        const updatedProds = [...prods];
        const rowId = rows[rowIndex].id;
        const tailIndex = fields.filter(field => field.rowId === rowId).length;
        const prodIndex = updatedProds.findIndex(prod => prod.rowID === rowId);
        if (prodIndex !== -1) {
            if (!updatedProds[prodIndex].tail) updatedProds[prodIndex].tail = [];
            updatedProds[prodIndex].tail[tailIndex] = value;
        } else {
            updatedProds.push({ rowID: rowId, head: '', tail: [value] });
        }
        setProds(updatedProds);
    };



    const handleSubmit = () => {
        console.log(prods)
        
    }



    return (
        <div className='h-screen bg-white text-black flex flex-col justify-center items-center'>

            {/* titiel */}
            {/* input the string */}
            <TextField id="input-string" label="string" variant="outlined" className='my-5' onChange={(e) => { setInputString(e.target.value) }} />


            {rows.map((row, rowIndex) => (
                <div key={row.id} className="firstrow flex flex-row items-center m-2">
                    {/* Left side */}
                    <Box width={50}>
                        <TextField
                            id={`head-${row.id}`}
                            variant="outlined"
                            fullWidth={true}
                            onChange={(e) => handleHeadChange(e.target.value, rowIndex)}
                        />
                    </Box>
                    {/* Arrow */}
                    <div className="arrow mx-2">
                        <IoIosArrowRoundForward color='black' size={32} />
                    </div>
                    {/* Right side */}
                    {[...Array(row.colCount)].map((_, colIndex) => (
                        <Box key={colIndex} width={50} marginRight={colIndex === row.colCount - 1 ? 0 : 2}>
                            <TextField
                                id={`field-${fields.length + 1}`}
                                variant="outlined"
                                fullWidth={true}
                                onChange={(e) => handleTailChange(e.target.value, rowIndex)}
                            />
                        </Box>
                    ))}
                    {/* add-col buttom */}
                    <button className="add-col arrow px-2" onClick={() => handleAddField(rowIndex)}>
                        <CiSquarePlus color='black' size={32} />
                    </button>
                </div>
            ))}

            {/* add-row button */}
            <button className="add-row arrow py-5" onClick={handleAddRow} >
                <CiSquarePlus color='black' size={32} />
            </button>

            <button className="text-black" onClick={() => handleSubmit()}>submit</button>

        </div>
    )
}

