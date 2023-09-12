import {REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR,SETUP_USER_BEGIN,SETUP_USER_SUCCESS,SETUP_USER_ERROR,LOGOUT_USER} from "./actions"

import { initialState } from "./appContext"
const reducer=(state,action)=>{

    if(action.type===REGISTER_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type===REGISTER_USER_SUCCESS){
        return {...state,isLoading:false,token:action.payload.token,user:action.payload.user,userLocation:action.payload.location,jobLocation:action.payload.location,showAlert:true,alertType:'success',alertText:'User Created! Redirecting...',}
    }
    if(action.type===REGISTER_USER_ERROR){
        return {...state,showAlert:true,alertType:'danger',alertText:action.payload.msg,}  
    }
    if(action.type===LOGIN_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type===LOGIN_USER_SUCCESS){
        return {...state,isLoading:false,token:action.payload.token,user:action.payload.user,userLocation:action.payload.location,jobLocation:action.payload.location,showAlert:true,alertType:'success',alertText:'Login Successful! Redirecting...',}
    }
    if(action.type===LOGIN_USER_ERROR){
        return {...state,showAlert:true,alertType:'danger',alertText:action.payload.msg,}  
    }


    if(action.type===SETUP_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type===SETUP_USER_SUCCESS){
        return {...state,isLoading:false,token:action.payload.token,user:action.payload.user}
    }
    if(action.type===SETUP_USER_ERROR){
        return {...state,showAlert:true,alertType:'danger',alertText:action.payload.msg,}  
    }
    if(action.type===LOGOUT_USER){
        return {...initialState,user:null,token:null,jobLocation:'',userLocation:''}
    } 

    throw new Error(`no such actions: ${action.type}`)
}

export default reducer