import React,{ useReducer,useContext,useState } from "react";
import reducer from "./reducers";
import axios from 'axios'

import {REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR,SETUP_USER_BEGIN,SETUP_USER_SUCCESS,SETUP_USER_ERROR ,LOGOUT_USER} from "./actions";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const token=localStorage.getItem('token');
const user=localStorage.getItem('user');


const initialState={
    isLoading:false,
    showAlert:false,
    user:user?JSON.parse(user):null,
    token:token,
    quiz:[],
}

const AppContext=React.createContext();


const AppProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer,initialState)
    const [users, setUsers] = useState([])
    const [quizzes, setQuizzes] = useState([]);
    const [quizId,setQuizId]=useState("")
    const [questions,setQuestions]=useState([])
    const [refresh,setRefresh]=useState(false)
    const[flag,setFlag]=useState(false)
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const[correct,setCorrect]=useState(false)
    const toast=useToast()
    const navigate=useNavigate()
    //axios
    const authFetch=axios.create({
        baseURL:'/api/v1',
    })
    //request
    authFetch.interceptors.request.use((config)=>{
        config.headers['Authorization']=`Bearer ${state.token}`
        return config 
    },(error)=>{
        return Promise.reject(error)
    })

    //response
    authFetch.interceptors.response.use((response)=>{
        return response
    },(error)=>{
        // console.log(error.response);
        if(error.response.status===401){
            logoutUser()
        }
        return Promise.reject(error)
    })







const addUserToLocalStorage=({user,token})=>{
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)

}

const removeUserFromLocalStorage=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    if(localStorage.getItem('quizId')){
        localStorage.removeItem('quizId')
    }

}

    const registerUser=async(currentUser)=>{
        dispatch({type:REGISTER_USER_BEGIN})
        try {
            const response=await axios.post('/api/v1/auth/register',currentUser)
            // console.log(response);
            const{user,token,location}=response.data
            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload:{user,token,location},
            })
            addUserToLocalStorage({user,token,location})
        } catch (error) {
            // console.log(error);
            dispatch({type:REGISTER_USER_ERROR,payload:{msg:error.response.data.msg}})
        }
        // clearAlert()
    }

    const loginUser=async(currentUser)=>{
        dispatch({type:LOGIN_USER_BEGIN})
        try {
            const {data}=await axios.post('/api/v1/auth/login',currentUser)
            const {user,token,location}=data
            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:{user,token,location},
            })
            addUserToLocalStorage({user,token,location})
        } catch (error) {
            dispatch({
                type:LOGIN_USER_ERROR,
                payload:{msg:error.response.data.msg},
            })
        }
        // clearAlert()
    }

    const setupUser=async({currentUser,endPoint})=>{
        dispatch({type:SETUP_USER_BEGIN})
        try {
            const {data}=await axios.post(`/api/v1/auth/${endPoint}`,currentUser)
            const {user,token}=data
            dispatch({
                type:SETUP_USER_SUCCESS,
                payload:{user,token}
            })
            toast({
                title: endPoint==="login"?"Login Successfull!":"Opt Sent Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              }); 
              addUserToLocalStorage({user,token})
              if(endPoint==="register") navigate("/verifyotp");
        } catch (error) {
            dispatch({ 
                type:SETUP_USER_ERROR,
                payload:{msg:error.response.data.msg},
            })
            toast({
                title: "Error occured!",
                status: "error",
                description:error.response.data.msg,
                duration: 5000,
                isClosable: true,
                position: "top",
              });
        }
 
        // clearAlert()
    }


    const getAllUsers=async()=>{
        const {data}=await axios.get('/api/v1/auth/getallusers')
        setUsers(data)
    }
    const getAllQuizes=async()=>{
        const {data}=await axios.get('/api/v1/quiz/getallquizes')
        initialState.quiz = data.map(obj => ({...obj}));
    }

    const getAllQuizId=(id)=>{
        setQuizId(id)
        localStorage.setItem('quizId',id);
    }

    const logoutUser=()=>{
        dispatch({type:LOGOUT_USER})
        removeUserFromLocalStorage() 
    }
    const getFlag=(f)=>{
        return f;
    }




    return (<AppContext.Provider value={{...state,registerUser,loginUser,setupUser,logoutUser,users,getAllUsers,getAllQuizes,quizId,getAllQuizId,questions,setQuestions,refresh,setRefresh,quizzes,setQuizzes,getFlag,flag,setFlag,correct,setCorrect,isSubmitClicked,setIsSubmitClicked}}>
    {children}
    </AppContext.Provider>
)
}

const useAppContext=()=>{
    return useContext(AppContext);
}


export {AppProvider,initialState,useAppContext}
