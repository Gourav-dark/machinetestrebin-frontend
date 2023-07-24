import './App.css';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import UserItem from './Components/UserItem';
import Axios from 'axios';

const App = () => {
  const [User, setUser] = useState({
    "username": "",
    "gender": "M",
    "birthday": "",
    "status": "Active",
    "address": ""
  });
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    userListfunction();
  }, []);
  //user List
  const userListfunction = async () => {
    try {
      const res = await Axios.get("https://localhost:7293/api/Users");
      setUserList(res.data);
    } catch(error) {
      console.log(error);
    }
  }
  //Add User
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const AddMember = async () => {
    try {
        const res = await Axios.post("https://localhost:7293/api/Users",User);
        setUserList([...userList, res.data]);
      setUser({
        username: "",
        birthday: "",
        address:""
        })
      } catch(error) {
        console.log(error);
      }
  }
  //Delete data
  const handledelete = (id) => {
    const updatedList = userList.filter((item) => item.id !== id);
    setUserList(updatedList);
  }
  // Remove All data
  const removeAll = () => {
    setUserList([]);
  }
  return (
    <div className='App bg-secondary p-2'>
      <div className='Add-Form border p-2 border-1 bg-white rounded'>
        <h6 className='text-dark'>Add Member</h6>
        <div className='From-Data border-top border-1'>
          <div className="row mt-2">
            <div className="col">
              <label className='mx-1'>Username:</label>
              <input type="text" className="form-control" placeholder="Username" value={User.username} onChange={handleInput} name='username'/>
            </div>
            <div className="col">
              <label className='mx-1'>Status:</label>
              <select className="form-control" onChange={handleInput} name='status'>
                <option defaultValue="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label className='mx-1'>Gender:</label>
              <select className="form-control" onChange={handleInput} name='gender'>
                <option defaultValue="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="col">
              <label className='mx-1'>Birthday:</label>
              <input type="date" className="form-control" value={User.birthday} onChange={handleInput} name='birthday'/>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label className='mx-1'>Address:</label>
              <textarea className='form-control' value={User.address} onChange={handleInput} name='address'></textarea>
            </div>
            <div className='col d-flex justify-content-end align-items-center'>
              <button className='btn btn-primary btn-lg' onClick={AddMember}>Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="UserList border p-2 border-1 bg-white rounded">
        <div className=' border-bottom border-1 my-1 py-1'>
          <span className='mx-1'>All Memeber</span>
          <button className='mx-1 btn btn-success py-0' onClick={userListfunction}>Show All</button>
          <button className='mx-1 btn btn-danger py-0' onClick={removeAll}>Remove All</button>
        </div>
        <div className='row'>
          <div className='col'>No</div>
          <div className='col'>ID User</div>
          <div className='col'>Username</div>
          <div className='col'>Gender</div>
          <div className='col'>Birthday</div>
          <div className='col'>Status</div>
          <div className='col'>Address</div>
          <div className='col'>Time</div>
          <div className='col-2'>Details</div>
        </div>
        {
          userList.map((item,index) => (
            <UserItem key={item.id} index={index} item={item} handledelete={handledelete} />
          ))
        }
      </div>
    </div>
  )
}

export default App
