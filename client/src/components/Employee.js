import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export default function Employee() {
    const [id, setId] = useState("");
    const [uname, setUname] = useState("");
    const addEmp = () => {
        let user = {
            id: id,
            name: uname,
        }
        axios.post("http://localhost:4000/addEmp", user).then(res => {
            alert(res.data.message);
        })
    }
    const idchange = (event) => {
        setId(event.target.value);
    }
    const unameChange = (event) => {
        setUname(event.target.value);
    }
    return (
        <div>
            <div className="password">
                <input className="pword" value={id} type="text" placeholder="id" required onChange={idchange} />
            </div>
            <div className="password">
                <input className="pword" value={uname} type="text" placeholder="username" required onChange={unameChange} />
            </div>
            <button className="but" onClick={addEmp}>submit</button>
        </div>
    )
}