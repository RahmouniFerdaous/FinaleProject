import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILED,GET_PROFILE_REQUEST,GET_PROFILE_SUCCESS,GET_PROFILE_FAILED,
        REGISTER_REQUEST, REGISTER_SUCCESS,REGISTER_FAILED,LOGOUT,
        PUT_ROLE_REQUEST,PUT_ROLE_SUCCESS,PUT_ROLE_FAILED} from '../actions/authTypes'
import axios from 'axios'
import {prefix} from '../../helpers/constant'
import {setToken} from '../../helpers/helpers'


//asynchrone fct login 
export const login = (info) => async (dispatch) => {
  dispatch ({type:LOGIN_REQUEST}) //spinner : waiting for info
  try{
    const res = await axios.post(`${prefix}/api/user/login`,info) 
    dispatch({
      type:LOGIN_SUCCESS,
      payload:res.data    
    })
    dispatch(getProfile())
  }
  catch (err){
    dispatch({
      type:LOGIN_FAILED,
      payload:err.response.data.errors    
    })
  }
}

//asynchrone fct login 
export const register = (info) => async (dispatch) => {
  dispatch ({type:REGISTER_REQUEST}) //spinner : waiting for info
  try{
    const res = await axios.post(`${prefix}/api/user/register`,info) 
    dispatch({
      type:REGISTER_SUCCESS,
      payload:res.data    
    })
  }
  catch (err){
    dispatch({
      type:REGISTER_FAILED,
      payload:err.response.data.errors    
    })
  }
}
//asynchrone fct getProfile
export const getProfile = () => async (dispatch) => {
  dispatch({type:GET_PROFILE_REQUEST})
try {
  setToken() // receive the tokenn from the localStorage
const {data} = await axios.get(`${prefix}/api/user/getProfile`) 
dispatch ({
  type:GET_PROFILE_SUCCESS,
  payload:data
})
}
catch (err) {
  dispatch({
    type:GET_PROFILE_FAILED,
    payload:err.response.data.errors    
  })
}
}

export const updateRole = (id,role) => async (dispatch) => {
  dispatch( {type:PUT_ROLE_REQUEST} )
try {
  setToken() // receive the tokenn from the localStorage
const {data} = await axios.put(`${prefix}/api/user/updaterole/${id}`,role) 
dispatch ({
  type:PUT_ROLE_SUCCESS,
  payload:data
})
}
catch (err) {
  dispatch({
    type:PUT_ROLE_FAILED,
    payload:err.response.data.errors    
  })
}
}

export const logout = () => {
return {
  type :LOGOUT
}
}