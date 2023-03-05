import Navbar from "./Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Homepage(props) {
    const [uname, setuname] = useState("");
    const [pwords, setPwords] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [pword, setPword] = useState("");
    const pwrodChange = (event) => {
        setPword(event.target.value);
    }
    const [uword, setUword] = useState("");
    const updatechange = (event) => {
        setUword(event.target.value);
    }
    useEffect(() => {
        getUsers();
    }, [])
    const getUsers = () => {
        axios.get('http://localhost:4000/getUsers').then((res) => {
            setUsers(res.data);
        });
    }
    const update = (id) => {
        navigate(`/update/${id}`);
    }
    const delUser = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4000/delUser/${pword}`).then(res => {
            alert(res.data.message);
        });
    }
    const login = (event) => {
        event.preventDefault();
        if (uname === '' || pwords === '') {
            setError(true);
        }
        else {
            console.log(uname, pword);
            let user = {
                name: uname,
                password: pwords
            }
            axios.post('http://localhost:4000/userLogin', user).then(res => {
                alert(res.data.message)
                props.setLoginUser(res.data.user);
                setError(false);
                setPword("");
                setuname("");
                navigate("/");
            });
        }
    }
    return (
        <div class="homeBox">
            {/* <Navbar setLoginUser={props.setLoginUser} /> */}
            <div>
                <div class="header h1"><h1>CRUD</h1></div>
                <div class="container">

                    <a href="/register" class="button">
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">create</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </a>

                </div>
                <div class="container">

                    <a href="/allUsers" class="button">
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">read</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </a>

                </div>
                <div className="password">
                    <input className="pword" value={pword} onChange={pwrodChange} type="text" placeholder="emp id" required />
                </div>
                <div class="container">

                    <a href="/allUsers" class="button" onClick={delUser}>
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">delete</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </a>

                </div>
                <div class="container">

                    <a href="allUsers" class="button" >
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">update</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </a>

                </div>


            </div>
        </div>
    );
}