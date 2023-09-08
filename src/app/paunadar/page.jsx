'use client'
import Link from 'next/link';
import { useState } from 'react';


export default async function page() {

    const [alert, setAlret] = useState(null)
    //const [searchInput, setSearchInput] = useState('')
    const [ filteredData, setFilteredResults ] = useState([])
    const [ search,setSearch]  = useState(false)

    const dars = await getData()

    const handleDel = (id) => {
        console.log(id)
        Delete(id)
        setAlret({
            'id': id,
            'msg': 'Deleted'
        })
    }

    const searchItems = (searchInput) => {
        setSearch(true)
        if(searchInput !== ''){
            const filteredData = dars.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(dars)
        }
    }

  return (
    <div>
        <div style={{display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <input type="text" placeholder="search" onChange={(e) => searchItems(e.target.value) } />
            <button><Link href={"paunadar/add"}>Add</Link></button>
        </div>
        {alert && <div className="notification">
                    <p >{alert.id}{alert.msg}</p>
                </div>
            }
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            {
                search ?

            <table id="customers">
                <caption>Paunadar</caption>
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Number</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    filteredData?.map((dar, index)=>{
                        return(

                            <tr key={dars[index]._id}>
                                <td>{dar.name}</td>
                                <td>{dar.address}</td>
                                <td>{dar.number}</td>
                                <td>{dar.amount}</td>
                                <td><button
                                onClick={()=>{
                                    handleDel(dars[index]._id)
                                }}
                                >Del</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
             :
        
        <table id="customers">
                <caption>Paunadar</caption>
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Number</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
        
        {
            dars?.length !== 0 && 
            dars?.map((dar, index)=>{
                return(

                    <tr key={dars[index]._id}>
                        <td>{dar.name}</td>
                        <td>{dar.address}</td>
                        <td>{dar.number}</td>
                        <td>{dar.amount}</td>
                        <td><button
                        onClick={()=>{
                            handleDel(dars[index]._id)
                        }}
                        >Del</button></td>
                    </tr>
                )
            })
        }
            </tbody>
        </table>
}
        </div>
    </div>
  )
}

const getData = async () =>{
    let res =  await fetch('http://localhost:3000/api/dar_post', {
        method: 'GET',
        mode: "cors",
        cache: 'no-cache',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
          },
    })
    return res.json()
}

const Delete = async (id) => {
    console.log(id)
    await fetch('http://localhost:3000/api/dar_post', {
        method: 'DELETE',
        mode: "cors",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(id)
    })
}