import React from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../services/apiService";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function AddAnimalForm() {
  const nav =useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubForm=(_bodyData)=>{
    // console.log(_bodyData);
    doApiPost(_bodyData);
  }
  const doApiPost=async(_bodyData)=>{
    try {
        const url=API_URL+"/animal";
        const resp=await axios({
            url:url,
            method:"POST",
            data:_bodyData
        })
        if (resp.data._id) {
          // has been add animal to the list
          window.alert("new animal has been added");
          nav("/animals");
        }
        console.log(resp.data);
    } catch (error) {
        return console.log(error);
    }
  }
  return (
    <div className="container">
      <h1 className="text-center">Add animal form</h1>
      <form className="col-md-6 mx-auto shadow p-2" onSubmit={handleSubmit(onSubForm)} id="id_form">
        <label>name</label>
        <input
          {...register("name", { required: true, minLength: 2 })}
          className="form-control"
          type="text"
        />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>info</label>
        <textarea
          {...register("info", { required: true, minLength: 2 })}
          className="form-control"
          type="textarea"
        ></textarea>
        {errors.info && <div className="text-danger">* Enter valid info</div>}
        <label>img_url</label>
        <input
          {...register("img_url", { required: true, minLength: 2 })}
          className="form-control"
          type="text"
        />
        {errors.img_url && (
          <div className="text-danger">* Enter valid img_url</div>
        )}
        <button className="btn btn-success my-3">Add new Animal</button>
      </form>
    </div>
  );
}
