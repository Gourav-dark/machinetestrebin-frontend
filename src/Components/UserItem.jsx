import { useState } from "react";
import UpdateUser from "./UpdateUser";

const UserItem = ({ index, item,handledelete }) => {
    const dateObj = new Date(item.birthday);
    const dateOnlyString = dateObj.toLocaleDateString();
    const [deletemmassage, setdeletemmassage] = useState(false);
    const [show, setshow] = useState(false);
    const deletefunction = () => {
        setdeletemmassage(false);
        handledelete(item.id);
    }
    const handleClose = () => {
        setshow(!show);
        console.log(show);
    }
    return (
        <div className='row'>
            <div className='col'>{index+1}</div>
            <div className='col'>{item.id}</div>
            <div className='col'>{item.username}</div>
            <div className='col'>{item.gender}</div>
            <div className='col'>{dateOnlyString}</div>
            <div className='col'>{item.status}</div>
            <div className='col'>{item.address}</div>
            <div className='col'>{item.time}</div>
            <div className='col-2 d-flex justify-content-start align-items-center gap-1'>
                <button className="btn btn-info" onClick={handleClose}>Edit</button>
                <button className="btn btn-danger" onClick={()=>setdeletemmassage(true)}>Delete</button>
            </div>
            {
                deletemmassage &&
                <div className="alert d-flex justify-content-between position-absolute top-50 start-50 translate-middle alert-danger w-75" role="alert">
                    Are You Sure You Want To delete User { item.username}
                    <button className="btn btn-danger py-0" onClick={deletefunction}>Delete</button>
                </div>
            }
            <UpdateUser item={item} show={show} handleClose={handleClose} />
        </div>
    );
}

export default UserItem
