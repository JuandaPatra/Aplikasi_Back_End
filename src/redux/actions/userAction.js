import axios from "axios";

const URL_API = 'http://localhost:2000/user'

export const login=(data)=>{
    return(dispatch)=>{
        axios.post(`${URL_API}/login`,data)
        .then(res=>{
            localStorage.setItem("IdUser",res.data[0].iduser)
            console.log(res.data[0].id)
            dispatch({
                type :'LOGIN',
                payload : res.data[0]
            })
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type : "FAILED_LOGIN",
                payload : err.response.data
            })

        })
    }
}

export const logout =()=>{
    return (dispatch)=>{
        localStorage.removeItem("IdUser")
        return dispatch({
            type : "LOGOUT"
        })
    }
}

export const keepLogin=(idUser)=>{
    return(dispatch)=>{
        axios.post(`${URL_API}/keeplogin/${idUser}`)
        .then(res=>{
            dispatch({
                type:'LOGIN',
                payload : res.data[0]
            })
        })
        .catch(err=> {
            // dispatch({
            //     type : "FAILED_LOGIN",
            //     payload : err.response.data
            // })
        })

    }
}

export const closeModal =()=>{
    return (dispatch)=>{
        dispatch({
            type :"CLOSE_MODAL"
        })
    }
}

export const register =(data)=>{
    return(dispatch)=>{
        //cek input data
        axios.post(`${URL_API}/register`, data)
        .then(res=>{
            return dispatch({
                type : "REGISTER_SUCCESS",
                payload : res.data
            })

        })
        .catch(err=>{
            dispatch({
                type :"REGISTER_NOT_COMPLETED",
                payload : err.response.data
            })
        })

    }
}

export const closeModalRegister =()=>{
    return(dispatch)=>[
        dispatch({
            type : "CLOSE_MODAL_REGISTER"
        })
    ]
}