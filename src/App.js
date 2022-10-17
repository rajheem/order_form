import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {db} from "./firebase"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const getDatafromLS=()=>{
  const data=localStorage.getItem('order');
  if (data){
    return JSON.parse(data)
  }
  else{
    return []
  }
}

let date=new Date()


function App() {
  const [order,setOrder]=useState(getDatafromLS())
  const [firstname,setFirstName]=useState('')
    const[lastname,setLastName]=useState('')
    const [branches,setBranches]=useState()
    const [selectedDate,setSelectedDate]=useState()
  const [formFields, setFormFields] = useState([
    { name: '',quantity:''},
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    let i=document.getElementById("form")
    console.log(i)
  }

  const addFields = () => {
    let object = {
      name: '',
      quantity:''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const handleFirstNameInputChange=(event)=>{
    setFirstName(event.target.value)
  }

  const handleLastNameInputChange=(event)=> {
      setLastName(event.target.value)
  }

  const handleBranchSelect=(event)=>{
      setBranches(event.target.value)
    }

  const handleOrderSubmit=(event)=>{
    event.preventDefault();
    let orders={
      first:firstname,
        last:lastname,
        branch:branches,
      orderplace:formFields,
        fulfildate:selectedDate,

    }
    db.collection('submitted-order').add({
        first:firstname,
        last:lastname,
        branch:branches,
        orderplace:formFields,
        fulfildate:selectedDate,
        ordersubmitted:date,
    })
        .then(()=>{
            toast("Order Successfully Submitted")
        })
        .catch(error=>{
            toast.error("Something Went Wrong With Your Submission")
        })

    setOrder([...order,orders]);
    setFirstName('')
      setLastName('')
    setFormFields([{ name: '',quantity: ''},])
      setBranches("")
      setSelectedDate("")
  }

  const deleteOrder=(index)=>{
      const filteredOrder=[...order]
      filteredOrder.splice(index,1)
      setOrder(filteredOrder)
  }

  useEffect(
      ()=>{
        localStorage.setItem('order',JSON.stringify(order));
      },[order]
  )

  return (
    <div className="App">
        <div className="container w-50 p-3">
        <h1>Replenishment Order Form {selectedDate}</h1>
        <div id="add_more">
        <button className="btn btn-warning"  style={{color:'white'}} onClick={addFields}>Add Another Item</button>
        </div>
        <div className="form-container">
            <br/>
      <form id="form" className="form-group" onSubmit={handleOrderSubmit}>
        <input id="inputID"
            required
            className="form-control"
            name='First Name'
            placeholder='Enter First Name'
            onChange={handleFirstNameInputChange}
            value={firstname}/><br/>
          <input id="inputID"
              required
              className="form-control"
              name='Last Name'
              placeholder='Enter Last Name'
              onChange={handleLastNameInputChange}
              value={lastname}/><br/>
          <select id="drop" required className="form-select" aria-label="Select Your Branch" value={branches} onChange={handleBranchSelect}>
              <option selected disabled value="">Select Your Branch </option>
              <option value="Branch 1">Branch 1</option>
              <option value="Branch 2">Branch 2</option>
              <option value="Branch 3">Branch 3</option>
              <option value="Branch 4">Branch 4</option>
              <option value="Branch 5">Branch 5</option>
              <option value="Branch 6">Branch 6</option>
              <option value="Branch 7">Branch 7</option>
              <option value="Branch 8">Branch 8</option>
              <option value="Branch 9">Branch 9</option>
              <option value="Branch 10">Branch 10</option>
              <option value="Branch 11">Branch 11</option>
              <option value="Branch 12">Branch 12</option>
              <option value="Branch 13">Branch 13</option>
              <option value="Branch 14">Branch 14</option>
              <option value="Branch 15">Branch 15</option>
              <option value="Branch 16">Branch 16</option>
              <option value="Branch 17">Branch 17</option>
              <option value="Branch 18">Branch 18</option>
              <option value="Branch 19">Branch 19</option>
              <option value="Branch 20">Branch 20</option>
              <option value="Branch 21">Branch 21</option>
              <option value="Branch 22">Branch 22</option>
              <option value="Branch 23">Branch 23</option>
          </select><br/>
        {formFields.map((form, index) => {
          return (
            <div  className="input-group mb-3" key={index}>
              <input
                  id="inputID"
                  required
                  className="form-control"
                name='name'
                placeholder='Item'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              <input
                  id="inputID"
                  type="number"
                  required
                  className="form-control"
                  name='quantity'
                  placeholder='Quantity'
                  onChange={event => handleFormChange(event, index)}
                  value={form.quantity}
              />
              <button className="btn btn-outline-danger" onClick={() => removeFields(index)}>Remove</button>
              </div>
          )
        })}
          <label>Enter Order Fulfillment Date </label>
          <input
              type="date"
              required
              name="date"
              className="form-control picker"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={e=>{setSelectedDate(e.target.value)}}
          /><br/>
          <button type="submit" className="btn btn-success" > Submit</button><br/><br/>
          <span>    </span>

      </form>
        </div>

      <div>


              <View order={order} />


      </div>
            <ToastContainer />
        </div>
    </div>

  );

    function View({order}){
        return (order.map((orders,index)=>(
                <div key={index}>
                    <h2 id="name">Name: {orders.first} {orders.last}</h2>
                    <h2 id="branch">{orders.branch}</h2>
                    <h2 id="order">Orders: {orders.orderplace.map((n,index)=>{
                        return `${n.name}:${n.quantity},  `
                    })}</h2>

                    <h2 id="fuldate">Requested to be fulfilled by: {orders.fulfildate}</h2>
                    <button className="btn btn-danger" onClick={()=>deleteOrder()}>Delete</button>
                </div>

            ))
        )
    }
}



export default App;
