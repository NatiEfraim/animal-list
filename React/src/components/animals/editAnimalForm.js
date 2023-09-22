import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../services/apiService";
import { useNavigate,useParams } from "react-router-dom";

import axios from "axios";

export default function EditAnimalForm() {
    const [item,setItem]=useState({});
    const params=useParams();
    const nav =useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubForm=(_bodyData)=>{
      // console.log(_bodyData);
      doApiPut(_bodyData);
    }
    useEffect(()=>{
        doApiInit();
    },[])
    const doApiInit=async()=>{
        try {
            const url=API_URL+"/animal/single/"+params["id"];
            const resp=await axios.get(url);
            console.log(resp.data);
            // update the animal has been choosen
            setItem(resp.data);
        } catch (error) {
            return console.log(error);
        }
    }
    const doApiPut=async(_bodyData)=>{
      try {
          const url=API_URL+"/animal/"+params["id"];
          const resp=await axios({
              url:url,
              method:"PUT",
              data:_bodyData
          })
          if (resp.data.modifiedCount) {
            // has been add animal to the list
            window.alert("new animal has been updared");
            nav("/animals");
          }
          console.log(resp.data);
      } catch (error) {
          return console.log(error);
      }
    }
    return (
      <div className="container">
        <h1 className="text-center">Edit animal</h1>
            {item._id ?
                    <form className="col-md-6 mx-auto shadow p-2" onSubmit={handleSubmit(onSubForm)} id="id_form">
                    <label>name</label>
                    <input defaultValue={item.name}
                      {...register("name", { required: true, minLength: 2 })}
                      className="form-control"
                      type="text"
                    />
                    {errors.name && <div className="text-danger">* Enter valid name</div>}
                    <label>info</label>
                    <textarea defaultValue={item.info}
                      {...register("info", { required: true, minLength: 2 })}
                      className="form-control"
                      type="textarea"
                    ></textarea>
                    {errors.info && <div className="text-danger">* Enter valid info</div>}
                    <label>img_url</label>
                    <input defaultValue={item.img_url}
                      {...register("img_url", { required: true, minLength: 2 })}
                      className="form-control"
                      type="text"
                    />
                    {errors.img_url && (
                      <div className="text-danger">* Enter valid img_url</div>
                    )}
                    <button className="btn btn-warning my-3 mx-3">UPdate</button>
                    <button onClick={()=>{
                      nav(-1);
                    }} className="btn btn-dark my-3">back list</button>
                  </form>
            : <h2>loading</h2>
            }
      </div>
    );
}
