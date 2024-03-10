"use client"
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { RxDividerVertical } from "react-icons/rx";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


export default function page() {
    const [rows, setRows] = useState([{ id: 1, colCount: 1 }]);
    // const [prods, setProds] = useState({ rowID: "", head: "", tail: [] });

    const [inputString, setInputString] = useState("")
    const [prods, setProds] = useState([])


    const handleAddRow = () => {
        const newId = rows.length + 1;
        setRows([...rows, { id: newId, colCount: 1 }]);
        setProds([...prods, { rowID: newId, head: '', tail: "" ,}]);
    };

    const handleHeadChange = (value, rowIndex) => {
        console.log(value)
        const updatedProds = [...prods];
        const rowId = rows[rowIndex].id;
        const prodIndex = updatedProds.findIndex(prod => prod.rowID === rowId);
        if (prodIndex !== -1) {
            updatedProds[prodIndex].head = value;
        } else {
            updatedProds.push({ rowID: rowId, head: value, tail: "" });
        }
        setProds(updatedProds);
    };

    const handleTailChange = (value, rowIndex) => {
        console.log(value)
        const updatedProds = [...prods];
        const rowId = rows[rowIndex].id;
        const prodIndex = updatedProds.findIndex(prod => prod.rowID === rowId);
        if (prodIndex !== -1) {
            updatedProds[prodIndex].tail = value;
        } else {
            updatedProds.push({ rowID: rowId, head: "", tail: value });
        }
        setProds(updatedProds);
    };



    const handleSubmit = async (e) => {
        try {
            console.log(prods)
            const docRef = await addDoc(collection(db, "prods"), {
                string: inputString,
                prod: prods,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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

                    <Box width={300} >
                        <TextField
                            id={`head-${row.id}`}
                            variant="outlined"
                            fullWidth={true}
                            onChange={(e) => handleTailChange(e.target.value, rowIndex)}
                        />
                    </Box>

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

