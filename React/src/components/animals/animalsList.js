import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../services/apiService';
import { useNavigate } from 'react-router-dom';


export default function AnimalsList() {
    const nav=useNavigate();
    const [arr_animals,setArr]=useState([]);
    useEffect(()=>{
        doApi();
    },[])
    const doApi=async()=>{
        const url=API_URL+"/animal";
        try {
            const resp=await axios.get(url);
            console.log(resp.data);
            setArr(resp.data);
        } catch (error) {
            
        }
    }
    // delete animal 
    const deleteAnimal=async(delId)=>{
        if (window.confirm("Are you sure ?")) {
            try {
                const url =API_URL+"/animal/"+delId;
                const resp =await axios({
                    url:url,
                    method:"DELETE",
                    data:{
    
                    }
                })
                if (resp.data.deletedCount) {
                    // animal has been deleted
                    doApi();//refrsh all animal again
                }
            } catch (error) {
                return console.log(error);
            }
        }
    }
  return (
    <div className='container'>
        <h2 className='display-1'>Animals list</h2>
        {/* one way  */}
        <button onClick={()=>{
            // window.alert("click");
            nav("/animals/add")
        }} className='btn btn-primary'>Add Animal</button>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>info animal</th>
                    <th>image url</th>
                    <th>Date created</th>
                    <th>Del/Edit</th>
                </tr>
            </thead>
            <tbody>
                {arr_animals.map((item,i)=>{
                    return(
                        <tr key={item._id}>
                            <td>{i+1}</td>
                            <td>{item.name}</td>
                            <td title={item.info}>{item.info.substring(0,15)}...</td>
                            <td title={item.img_url}>{item.img_url.substring(0,10)}</td>
                            <td>{item.date_created.substring(0,10)}</td>
                            <td>
                                <button onClick={()=>{
                                    deleteAnimal(item._id);
                                }} className='btn btn-danger mx-3'>DEL</button>
                                <button onClick={()=>{
                                    nav(`/animals/edit/${item._id}`)
                                }} className='btn btn-secondary'>Edit</button>
                            </td>
                            
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}
