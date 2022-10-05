import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../auth/usercontext'
import logo from '../logo.svg'
import bg from '../imagef.jpg'
const Signin = () => {
    const [success, setsuccess] = useState('Login')
    const [clicked, setclicked] = useState(0)
    const nav = new useNavigate()
    const {setDetails} = useContext(UserContext)
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        if(truth){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, auth, matno, level, department}} = kept
            const{ token } = kept
            console.log(name)
            console.log(token)
            setDetails({
                name:name,
                authlev:auth,
                matno: matno,
                department: department,
                level: level
            })
            if(auth === '2'){
                nav('/studdash')
            }
            else{
                nav('/admindash')
            }
        }
    }, [])
    const log =  () => {
        setsuccess('Signing in')
        setclicked(1)
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(pack);
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/login2',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            
            const {name, auth, matno, level, department} = response.data.credentials
            setDetails({
                name:name,
                authlev:auth,
                matno: matno,
                department: department,
                level: level
            })
            localStorage.setItem('logs', JSON.stringify(response.data))
            console.log(JSON.stringify(response.data));
                if(auth === '2'){
                    nav('/studdash')
                }
                else{
                    nav('/admindash')
                }
        })
        .catch(function (error) {
            setsuccess('Invalid email or password')
            setclicked(1)
        console.log(error);
        });
    }
    const [pack, setpack] = useState({
        'matno': '',
        'password': '' 
    })
    return(
        <div>
            <div className="container">
                    <div className='children'>
                    <div className='mid'>
                        <img src={logo} alt=""/>
                        <h1>The Federal Polytechnic, Bida</h1>
                        <h2>Screening Portal</h2>
                        <div className='form'>
                            <input type='text' placeholder='Staff/Student' onChange={(e)=>{setpack({...pack, matno:e.target.value}); setsuccess('Sign in')}}/>
                            <input type='password' placeholder='Password' onChange={(e)=>{setpack({...pack, password:e.target.value}); setsuccess('Sign in')}}/>
                            {clicked === 1 ? <button style={{backgroundColor:'grey'}}>{success}</button> : <button onClick={log} style={{backgroundColor:'rgb(42, 183, 117)'}}>{success}</button>}
                            <Link to="/signup" className='link' style={{color:'rgb(42, 183, 117)'}}>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Signin