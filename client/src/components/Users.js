import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function UserInfo() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const update = (id) => {
        navigate(`/update/${id}`);
    }
    const delUser = (id) => {
        console.log(id);
        axios.delete(`http://localhost:4000/delUser/${id}`).then(res => {
            alert(res.data.message);
            getUsers();
        });
    }
    useEffect(() => {
        getUsers();
    }, [])
    const getUsers = () => {
        axios.get('http://localhost:4000/getUsers').then((res) => {
            setUsers(res.data);
        });
    }
    return (
        <div>
            {/* <Navbar /> */}
            <div className="table table-bordered">
                <table className="table table-bordered">
                    <thead >
                        <tr>
                            <th>Username</th>
                            <th>Branch</th>
                            <th >Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr>
                                <td className="w-25">{user.name}</td>
                                <td className="w-25">{user.branch}</td>
                                <td className="w-25">{user.password}<span className="userBut"><button className="but" onClick={() => { update(user._id) }}>update</button></span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}