import { useState } from "react";
import Axios from 'axios';
const UpdateUser = ({ item, show, handleClose }) => {
    const handleInput = (event) => {
    const { name, value } = event.target;
        setUser((prev) => {
            return { ...prev, [name]: value };
        });
    }
    const [User, setUser] = useState({
        ...item
    });
    const handleSubmit = async () => {
        console.log(item);
        try {
            const res = await Axios.put(`https://localhost:7293/api/Users/${item.id}`,User);
            //setUserList([...userList, res.data]);
            handleClose();
      } catch(error) {
            console.log(error);
      }
    }
    return (
        <div
            className={`modal ${show ? "d-block" : ""}`}
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog border-light" role="document" style={{ marginTop: "7rem" }}>
                <div className="modal-content">
                    <div className="modal-header bg-dark text-light">
                        <h5 className="modal-title">Update User</h5>
                        <button
                            type="button"
                            className="btn-close bg-light"
                            onClick={handleClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className='From-Data'>
                            <div className="row mt-2">
                                <div className="col">
                                    <label className='mx-1'>Username:</label>
                                    <input type="text" className="form-control" placeholder="Username" value={User.username} onChange={handleInput} name='username' />
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
                                    <input type="date" className="form-control" value={User.birthday} onChange={handleInput} name='birthday' />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <label className='mx-1'>Address:</label>
                                    <textarea className='form-control' value={User.address} onChange={handleInput} name='address'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Update Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateUser
