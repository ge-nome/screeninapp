import logo from '../logo.svg'
import {useNavigate} from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import {UserContext} from '../auth/usercontext'
const SHome = () => {
    const nav = useNavigate()
    const value = useContext(UserContext)
    const {details:{name, auth, matno, department}}= value
     useEffect(() => {
        if (matno === '') {
            nav('/');
        }
    }, [matno])
    const [status, setstatus] = useState({
        approved : '',
        reason : ''

    })
    const [success, setsuccess] = useState('')
    const [msg, setmsg] = useState('')
    const [levels, setlevels] = useState(0)
    const [level, setlevel] = useState('')
    const payload = () => {
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('name', name);
        data.append('matno', matno);
        data.append('department', department);
        data.append('level', level);
        data.append('img1', status.birth);
        data.append('img2', status.state);
        data.append('img3', status.clear);
        data.append('img4', status.oath);
        data.append('img5', status.course);
        data.append('eligibility', status.approved);
        data.append('reason', status.reason);

        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/student',
        headers: { 
            'Accept': 'application/json',
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        setsuccess(<div style= {{backgroundColor:'#cfffcf', color:'#4b9a5f', border:'1px solid #cfffcf', borderRadius:'4px', padding:'20px', minWidth:'400px', marginTop:'20px', fontSize:'1.5em'}}> Successfully submitted</div>)
        setfinish('')
        })
        .catch(function (error) {
        console.log(error);
        setsuccess(<div style= {{backgroundColor:'#ffd6cf', color:'#9a4b4b', borderRadius:'4px', padding:'20px', minWidth:'400px', marginTop:'20px', fontSize:'1.5em' }}> An error occurred</div>)
        setfinish('An error occurred')
    });

    }
    const [upload, setupload] = useState(0)
    const [finish, setfinish] = useState('Finish')
    // const [eligibility2, seteligibility2] = useState()
    const chscrfrmnd=()=>{
        let eligibility = 1
        let eligibility2 = 0
        const one = Object.values(ssce)
        if(one){
            one.every(xs => {
                if (parseInt(xs) > 6) {
                    eligibility=0
                    return false
                    
                }
                return true
            }
            )
        }
        if (parseInt(jamb.score) > 180 ) {
            eligibility2=1
        }
        else{
            eligibility2 = 0
        }
        if(eligibility === 1 && eligibility2 === 1){
            console.log('Congratulations. You are eligible for admission')
            setstatus({...status, approved : 1, reason:''})
            setupload(1)
            setmsg('Congratulations. You are fully eligible. Proceed to upload the required documents')
        }
        else if(eligibility === 0 && eligibility2 === 1){
            console.log('You are not eligible because of your WAEC deficiency')
            setstatus({...status, approved : 0, reason:'WAEC result is deficient'})
            setupload(0)
            setmsg('You are not eligible because of your WAEC deficiency. You cannot proceed any further')
        }
        else if(eligibility === 1 && eligibility2 === 0){
            console.log('You are not eligible because your JAMB score is not up to cut off mark')
            setstatus({...status, approved : 0, reason:'JAMB score is not up to cut off mark'})
            setupload(0)
            setmsg('You are not eligible because your JAMB score is not up to cut off mark. You cannot proceed any further')
        }
        else{
            console.log('Both WAEC and JAMB results do not meet the minimum criteria')
            setmsg('Both WAEC and JAMB results do not meet the minimum criteria. You cannot proceed any further')
            setstatus({...status, approved : 0, reason:'Both WAEC and JAMB results do not meet the minimum criteria'})
        }

    }
    const chscrfrm=()=>{
        let eligibility = 1
        let eligibility2 = 0
        const one = Object.values(ssce)
        if(one){
            one.every(xs => {
                if (parseInt(xs) > 6) {
                    eligibility=0
                    return false
                    
                }
                return true
            }
            )
        }
        if (parseInt(nd.grade) > 2 ) {
            // console.log('You should spend two years before reapplyibg')
            const fyear = nd.year.substring(0, 4)
            const iyear = nd.ityear.substring(0, 4)

            if((iyear - fyear) >= 2){
                eligibility2=1
            }
            else{
                eligibility2=0
            }
        }
        else{
            eligibility2 = 1
        }
        if(eligibility === 1 && eligibility2 === 1){
            console.log('Congratulations. You are fully eligible. Proceed to upload the required documents')
            setmsg('Congratulations. You are fully eligible. Proceed to upload the required documents')
            setstatus({...status, approved : 1, reason:''})
            setupload(2)
        }
        else if(eligibility === 0 && eligibility2 === 1){
            console.log('You are not eligible because your WAEC is deficient')
            setmsg('You are not eligible because your WAEC is deficient. You cannot proceed any further')
            setstatus({...status, approved : 0, reason:'WAEC is deficient'})
            setupload(0)
        }
        else if(eligibility === 1 && eligibility2 === 0){
            console.log('You are not eligible because you have not spent the required number of years(2) required for your National Diploma grade')
            setmsg('You are not eligible because you have not spent the number of years(2) required for your National Diploma grade You cannot proceed any further')
            setstatus({...status, approved : 0, reason:'Applicant has not spent the number of years(2) required for their National Diploma grade'})
            setupload(0)
        }
        else{
            console.log('You are not eligible because your WAEC is deficient and you have not spent the number of years(2) required for your National Diploma grade')
            setmsg('You are not eligible because your WAEC is deficient and you have not spent the number of years(2) required for your National Diploma grade. You cannot proceed any further')
            setstatus({...status, approved : 0, reason:'WAEC is deficient and applicant has not spent the number of years(2) required for their National Diploma grade'})
            setupload(0)
        }

    }
    const [ssce, setssce] = useState({
        english:'',
        mathematics:'',
        physics:'',
        chemistry:'',
        biology:'',
    })
    const [nd, setnd] = useState({
        year:'',
        grade:'',
        ityear:''
    })
    const [jamb, setjamb] = useState({
        score:''
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
                    <div className='left'>Welcome {name}</div>
                    <div className='right' onClick={destroy} style={{cursor:'pointer'}}>Logout</div>
                </div>
                <div className='sbottom'>
                    <div className='lcontainer'>
                        <div className='title'>
                            <h1>Screening</h1>
                            <div className='hr'></div>
                        </div>
                        <div className='which'>
                            <h2>Which level are you being screened for?</h2>
                            <div className='choice'>
                                <span onClick={()=>{setlevels(1); setlevel('ND'); setmsg('')} } style={{cursor:'pointer'}}>National Diploma</span>
                                <span  onClick={()=>{setlevels(2); setlevel('HND'); setmsg('')}} style={{cursor:'pointer'}}>Higher National Diploma</span>
                            </div>
                        </div>
                        {
                            levels === 1 ? 
                            <div className='forms'>
                                <h2>ND Screening form</h2>

                                <div className='sections'>
                                    <h3>SSCE Result</h3>
                                    <p>Input the grades that are in your SSCE result that correspond to the subjects you find on the lefthand side</p>
                                    <div>
                                        <input type='text' value='English' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, english : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Mathematics' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, mathematics : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Physics' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, physics : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Chemistry' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, chemistry : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Biology' disabled/>
                                        <select onChange={(e)=>{setssce({...ssce, biology : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='sections'>
                                    <div>
                                        <div>
                                            <p>JAMB Score</p>
                                            <input type='number' placeholder='JAMB score' onChange={(e)=>{setjamb({...jamb, score : e.target.value})}}/>
                                        </div>
                                    </div>
                                </div>                                
                                <div className='submit'>
                                    <button onClick={chscrfrmnd}>Next</button>
                                </div>
                            </div> : levels === 2 ?
                            <div className='forms'>
                                <h2>HND Screening form</h2>
                                <div className='sections'>
                                    <h3>SSCE Result</h3>
                                    <p>Input the grades that are in your SSCE result that correspond to the subjects you find on the lefthand side</p>
                                    <div>
                                        <input type='text' value='English' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, english : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Mathematics' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, mathematics : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Physics' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, physics : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Chemistry' disabled />
                                        <select onChange={(e)=>{setssce({...ssce, chemistry : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' value='Biology' disabled/>
                                        <select onChange={(e)=>{setssce({...ssce, biology : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>A1</option>                                        
                                            <option value='2'>B2</option>
                                            <option value='3'>B3</option>                                        
                                            <option value='4'>C4</option>
                                            <option value='5'>C5</option>                                        
                                            <option value='6'>C6</option>
                                            <option value='7'>D7</option>
                                            <option value='8'>E8</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='sections'>
                                    <h3>National Diploma Result</h3>
                                    <h4>Tell us about your National Diploma</h4>
                                    <div>
                                        <div>
                                            <p>Date completed</p>
                                            <input type='date' onChange={(e)=>{setnd({...nd, year : e.target.value})}}/>
                                        </div>
                                        <select onChange={(e)=>{setnd({...nd, grade : e.target.value})}}>
                                            <option value=''>Grade</option>
                                            <option value='1'>Distinction</option>                                        
                                            <option value='2'>Upper Credit</option>
                                            <option value='3'>Lower Credit</option>                                        
                                            <option value='4'>Pass</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='sections'>
                                    <h3>Industrial Training</h3>
                                    <div>
                                        <p>Date completed</p>
                                        <input type='date' onChange={(e)=>{setnd({...nd, ityear : e.target.value})}}/>
                                    </div>
                                </div>
                                
                                <div className='submit'>
                                    <button onClick={chscrfrm}>Next</button>
                                </div>
                            </div> : ''
                        }
                        { msg ? 
                            <div className='fb'>
                                <div>
                                    <h4>Feedback</h4>
                                    <p className='hr'></p>
                                    <p>{msg}</p>
                                    {upload === 0 ? <p onClick={payload} style={{textDecoration:'underline', cursor:'pointer'}}>{finish}</p> : ''}
                                </div>
                            </div>
                            : '' }
                    </div>
                    <div className='lcontainer'>
                        <div className='title'>
                            <h1>Upload Documents</h1>
                            <div className='hr'></div>
                        </div>
                        <div className='forms'>
                            {upload === 1 ? 
                                <div>
                                    <div className='sections'>
                                        <div>
                                            <div>
                                                <p>Birth certificate</p>
                                                <input type='file' onChange={(e)=>setstatus({...status, birth : e.target.files[0]})}/>
                                            </div>
                                            <div>
                                                <p>State of Origin</p>
                                                <input type='file' onChange={(e)=>setstatus({...status, state : e.target.files[0]})}/>
                                            </div>
                                            <div>
                                                <p>JAMB Printout</p>
                                                <input type='file' onChange={(e)=>setstatus({...status, clear : e.target.files[0]})}/>
                                            </div>
                                            <div>
                                                <p>SSCE Result</p>
                                                <input type='file' onChange={(e)=>setstatus({...status, oath : e.target.files[0]})}/>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className='submit'>
                                        <button onClick={payload}>Submit</button>
                                    </div> 
                                    {success}
                                </div>
                                : upload === 2 ?
                                    <div>
                                        <div className='sections'>
                                            <div>
                                                <div>
                                                    <p>Birth certificate</p>
                                                    <input type='file' onChange={(e)=>setstatus({...status, birth : e.target.files[0]})}/>
                                                </div>
                                                <div>
                                                    <p>State of Origin</p>
                                                    <input type='file' onChange={(e)=>setstatus({...status, state : e.target.files[0]})}/>
                                                </div>
                                                <div>
                                                    <p>SSCE Result</p>
                                                    <input type='file' onChange={(e)=>setstatus({...status, clear : e.target.files[0]})}/>
                                                </div>
                                                <div>
                                                    <p>IT Certificate</p>
                                                    <input type='file' onChange={(e)=>setstatus({...status, oath : e.target.files[0]})}/>
                                                </div>
                                                <div>
                                                    <p>OND Result</p>
                                                    <input type='file' onChange={(e)=>setstatus({...status, course : e.target.files[0]})}/>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className='submit'>
                                            <button onClick={payload}>Submit</button>
                                        </div> 
                                        {success}
                                    </div>
                            : ''}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SHome