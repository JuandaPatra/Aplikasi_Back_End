import axios from "axios";

const URL_API = 'http://localhost:2000/user'

export const login=(data)=>{
    return(dispatch)=>{
        axios.post(`${URL_API}/login`,data)
        .then(res=>{
            localStorage.setItem("token",res.data.token)
            // console.log(res.data[0].id)
            dispatch({
                type :'LOGIN',
                payload : res.data.datauser
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
        localStorage.removeItem("token")
        return dispatch({
            type : "LOGOUT"
        })
    }
}

export const keepLogin=(token)=>{
    return(dispatch)=>{
        axios.post(`${URL_API}/keeplogin`, {}, {headers: {'Authorization' : `Bearer ${token}`}})
        .then(res=>{
            console.log(res.data)
            dispatch({
                type:'LOGIN',
                payload : res.data[0]
            })
        })
        .catch(err=> {
            console.log(err)
            dispatch({
                type : "FAILED_LOGIN",
                payload : err.response.data
            })
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

export const verification=(token)=>{
    return(dispatch)=>{
        axios.post(`${URL_API}/verification`, {}, {headers :{'Authorization': `Bearer ${token}`}})
        .then(res =>{
            console.log(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }

}

export const changePassword =(email)=>{
    return(dispatch)=>{
        // console.log(email)
        axios.post(`${URL_API}/changepassword`, {"email" : email})
        .then(res =>{
            return dispatch({
                type : "SUCCESS_SEND_EMAIL",
                payload : res.data
            })
        })
        .catch(err=>{
            return dispatch({
                type : "FAIL_SEND_EMAIL",
                payload : err.response.data
            })
        })
    }
}

export const closeModalSendEmail =()=>{
    return(dispatch)=>{
        dispatch({
            type : "CLOSE_MODAL_SEND_EMAIL"
        })
    }

}

export const SendNewPassword =(data)=>{
    console.log(data)
    return(dispatch)=>{
        axios.post(`${URL_API}/newpassword`,{"email" : data.email, "password":data.password})
        .then(res =>{
            console.log(res.data)

        })
    }

}