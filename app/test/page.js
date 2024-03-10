"use client"
import React, { useState } from 'react';

export default function InputArrayComponent() {
    // Step 2: Set up state to hold input data
    const [inputs, setInputs] = useState([]);

    // Step 3: Update state when input fields change
    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index] = event.target.value;
        setInputs(newInputs);
    };

    // Step 4: Push input data into an array

    // Function to handle adding new input fields
    const addInput = () => {
        setInputs([...inputs, '']);
    };

    // Function to handle removing input fields
    const removeInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    return (
        <div className='bg-white text-black'>
            {/* Step 1: Render multiple input fields conditionally */}
            {inputs.map((input, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={input}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <button onClick={() => removeInput(index)}>Remove</button>
                </div>
            ))}
            <button onClick={addInput}>Add Input</button>

            {/* Display the array */}
            <div>
                <h2>Input Data:</h2>
                <ul>
                    {inputs.map((input, index) => (
                        <li key={index}>{input}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

