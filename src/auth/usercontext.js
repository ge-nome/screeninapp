import { useState, useEffect, createContext} from "react";
export const UserContext = createContext()

const UsedContext = (props) => {
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        if(truth){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, auth, matno, level, department}} = kept
            console.log(name)
            setDetails({
                name:name,
                authlev:auth,
                matno: matno,
                department: department,
                level: level
            })
        }
    }, [])
    const [details, setDetails] = useState({
        name:'',
        authToken:'',
        matno: '',
        department:'',
        level: ''
    })
    return(
        <UserContext.Provider value={{details, setDetails}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UsedContext;