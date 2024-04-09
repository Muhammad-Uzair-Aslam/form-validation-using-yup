"use client"
import * as yup from "yup"
import Image from "next/image";
import { useState } from "react";
const contactSchema=yup.object().shape({
  name:yup.string().required().min(5).max(20),
  email:yup.string().required().email(),
  phone: yup.number().required().test('len', 'Phone Number must be exactly 11 digits', (val) => val && val.toString().length === 11)
  ,
  cnic:yup.number().required().test('len', 'CNIC must be exactly 14 digits', (val) => val && val.toString().length === 14)
  ,
  message:yup.string().required()
})
export default function Home() {
  const [error,setError]=useState([])
  const [contactList,setContactList]=useState([]);
  const [contactInfo,setContactInfo] =useState({
    name:'',
    phone:0,
    email:'',
    message:'',
    cnic:0
  })
  const onChangeHandler=(e)=>{
    setContactInfo((a)=>({...a,[e.target.name]:e.target.value}))
    console.log(e.target.value)
  }
  const OnClickHandler=async(e)=>{
    e.preventDefault()
    try{
    let neww=await contactSchema.validate(contactInfo);
    setContactList([...contactList,neww]);
    setContactInfo({
      name:'',
      phone:0,
      email:'',
      message:'',
      cnic:0
    })
  setError([])}
    catch(err){
      setError(err.errors)
    }
  }
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-center ">Contact Form</h1>
      <form action="" className="">
        <div className="my-3 flex flex-col sm:flex-row">
          <label htmlFor="name" className="w-full sm:w-64">Please Enter Your Name</label>
          <input onChange={onChangeHandler} className="px-5 py-1 border border-gray-500 rounded-lg" type="text" id="name" value={contactInfo.name} name="name" required/>
        </div>
        <div className="my-3 flex flex-col sm:flex-row">
          <label htmlFor="number" className="w-full sm:w-64">Please Enter Your Phone Number</label>
          <input onChange={onChangeHandler} className="px-5 py-1 border border-gray-500 rounded-lg" type="number" id="number" value={contactInfo.phone} name="phone" required/>
        </div>
        <div className="my-3 flex flex-col sm:flex-row">
          <label htmlFor="email" className="w-full sm:w-64">Please Enter Your Email</label>
          <input onChange={onChangeHandler} className=" px-5 py-1 border border-gray-500 rounded-lg" type="email" id="email" value={contactInfo.email} name="email" required/>
        </div>
        <div className="my-3 flex flex-col sm:flex-row">
          <label htmlFor="message" className="w-full sm:w-64">Please Enter Your Message</label>
          <textarea onChange={onChangeHandler} className=" px-5 py-1 border border-gray-500 rounded-lg" type="text" id="message" value={contactInfo.message} name="message" required/>
        </div>
        <div className="my-3 flex flex-col sm:flex-row">
          <label htmlFor="cnic" className="w-full sm:w-64">Please Enter Your CNIC</label>
          <input onChange={onChangeHandler} className=" px-5 py-1 border border-gray-500 rounded-lg" type="number" id="cnic" value={contactInfo.cnic} name="cnic" required/>
        </div>
        <button onClick={OnClickHandler} className="bg-blue-600 text-white rounded-xl font-semibold px-10 py-2">Submit</button>
      </form>
     
    </div>
  );
}
