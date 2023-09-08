import { useState } from "react"
export default function card({ caption, data, fields }) {

    return (
        <table id="customers">
            <caption>{caption}</caption>
            <thead>
                <tr>
                    {
                        fields?.map((e, index)=>{
                            return <th>{e.title}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((dar, index)=>{
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
    )
}
