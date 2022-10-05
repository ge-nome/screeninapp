import { useEffect, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {useReactToPrint} from 'react-to-print'
import logo from '../logo.svg'
const Home = () => {
    const nav = useNavigate()
    useEffect(() => {
        fetch()
    }, [])
    const fetch = () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/student',
        headers: { 
            'Accept': 'application/json'
        }
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data.eligible));
        seteligible(response.data.eligible);
        setineligible(response.data.ineligible);
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    const [eligible, seteligible] = useState([])
    const [ineligible, setineligible] = useState([])
    const componentRef = useRef();
    const print=useReactToPrint({
        content: () => componentRef.current
    })
    const componentRef2 = useRef();
    const print2=useReactToPrint({
        content: () => componentRef2.current
    })
    const destroy = () => {
        localStorage.removeItem('logs')
        nav('/')
    }
    return(
        <div className="containers">
            <div className="lhs">
                <img src={logo} alt=''></img>
            </div>
            <div className="rhs">
                <div className='top'>
                    <div className='left'>Welcome Screening Officer</div>
                    <div className='right' onClick={destroy} style={{cursor:'pointer'}}>Logout</div>
                </div>
                <div className='bottom'>
                    <div>
                        <h1>Screening List</h1>
                        <div className='elig' ref={componentRef}>
                            <div className='top2' >
                                <h3 className='left'>Eligible Students</h3>
                                <p className='right' onClick={()=>{print()}}>Print</p>
                            </div>
                            <div className='list'>
                                <div className='each'>
                                    <p>SN</p>
                                    <p>Name</p>
                                    <p>Matriulation Number</p>
                                    <p>Department</p>
                                    <p>Level</p>
                                    <p>Reason</p>
                                </div>
                                {eligible.map(({ name, matno, department, level, reason}, i) => ( 
                                    <div className='eachcont' key={i}>
                                        <p>{i+1}</p>
                                        <p>{name}</p>
                                        <p>{matno}</p>
                                        <p>{department}</p>
                                        <p>{level}</p>
                                        <p>{reason}</p>
                                    </div>
                                ))}
                                
                                
                            </div>
                        </div>
                        <div className='inelig' ref={componentRef2}>
                            <div className='top2'>
                                <h3 className='left'>Ineligible Students</h3>
                                <p className='right' onClick={()=>{print2()}}>Print</p>
                            </div>
                            <div className='list'>
                                <div className='each'>
                                    <p>SN</p>
                                    <p>Name</p>
                                    <p>Matriulation Number</p>
                                    <p>Department</p>
                                    <p>Level</p>
                                    <p>Reason</p>
                                </div>
                                {ineligible.map(({id, name, matno, department, level, reason}, i) => ( 
                                    <div className='eachcont' key={i}>
                                        <p>{i+1}</p>
                                        <p>{name}</p>
                                        <p>{matno}</p>
                                        <p>{department}</p>
                                        <p>{level}</p>
                                        <p>{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home