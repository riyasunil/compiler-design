"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useRouter } from 'next/navigation';


export default function ParseTrees() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const { docID } = router.query;

    console.log(docID)

    useEffect(() => {

        if (docID) {
            getData();
        } else {
            console.log("fuck")
        }
    }, [docID]);
    

    const getData = async () => {
        try {
            const q = query(collection(db, "prods"), where("docRef", "==", docID));
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(documents);
            console.log("hiii")
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };

    return (
        <div className=' bg-white text-black flex flex-col justify-center items-center'>
            <h1>Parse Tree</h1>
            {data && (
                <ul className='text-black'>
                    {data.map((doc, index) => (
                        <li key={index}>{JSON.stringify(doc)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
