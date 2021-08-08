const INITIAL_STATE ={
    id:null,
    username : "",
    password : "",
    errorRegister :false,
    msgErrRegis : "",
    failedLogin :false,
    msgFailedLogin :"",
    msgSuccessReg : "",
    registerModal : false
}

const userReducer =(state= INITIAL_STATE, action)=>{
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                id :action.payload.iduser,
                username :action.payload.username,
                password : action.payload.password
            }
        case "LOGOUT":
            return INITIAL_STATE
        case "REGISTER":
            return{
                ...state,
                id : action.payload.iduser,
                username : action.payload.username,
                password : action.payload.password
            }
        case "FAILED_LOGIN":
            return{
                ...state,
                failedLogin :true,
                msgFailedLogin : action.payload
            }
        case "CLOSE_MODAL":
            return{
                ...state,
                failedLogin :false,
                msgFailedLogin :"",
                msgErrRegis :"",
                errorRegister :false
            }
        case "REGISTER_NOT_COMPLETED":
            return{
                ...state,
                errorRegister :true,
                msgErrRegis : action.payload
            }
        case "REGISTER_SUCCESS":
            return{
                ...state,
                msgSuccessReg : action.payload,
                registerModal : true,
            }
        case "CLOSE_MODAL_REGISTER":
            return{
                ...state,
                registerModal :false
            }
        default :
            return state
    }
}

export default userReducer