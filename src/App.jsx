import { useReducer } from 'react'
import './App.css'
import Adddigit from './add_digit'
import Operation from './operations'
function reducer(state,action){
switch(action.type){
  case "adddigit":
    if(state.overwrite){
      return{
        ...state,
        overwrite:false,
        currop:action.payload
      }
    }  
     if(action.payload ==="0" && state.currop ==="0"){
      return state;
    }
    if(action.payload ==="." && state.currop.includes(".")){
      return state; 
    }
    return{...state,currop:`${state.currop||""}${action.payload}`}
  case "operation":
      if(state.currop ==null && state.preop == null){
        return state;
      }
       if(state.preop == null){
    return{...state,preop:state.currop,currop:null,op:action.payload};
      }
      if(state.currop == null){
        return{
          ...state,op:action.payload
        }
      }
      if(evaluate(state) == "Math Error"){
        return{
          ...state,op:null,preop:"Math Error",currop:null
        }
      }
      return{
        ...state,preop:evaluate(state),op:action.payload,currop:null
      }
  case "clear":{
      return {currop:null,preop:null,op:null}
    }
  case "evaluate":{
    if(state.currop==null||state.preop==null||state.op==null){
    return state;
    }
    return {
      ...state,
      overwrite:true,
      preop:null,
      op:null,
      currop:evaluate(state)}
  }  
  case "del":{
  if(state.overwrite){
    return{
      ...state,
      currop:null
    }
  }
  if(state.currop!=null){
    if(state.currop.length==1){
     return{ 
      ...state,
    currop:null
  }
    }
   return{
    ...state,
    currop:state.currop.slice(0,-1)
   }  
  }
    if(state.op!=null){
       return{ 
      ...state,
       op:null
  }
    }
    if(state.preop!=null){
      if(state.preop.length==1){
     return{ 
      ...state,
    preop:null
  }
    }
   return{
    ...state,
    preop:state.preop.slice(0,-1)
   }  
    }
    return state;
  }
  }
}
function evaluate(state){ 
let a= parseFloat(state.preop);
let b= parseFloat(state.currop);
let val;
switch(state.op){
  case "+":{
  val = a+b;
  break;
  }
   case "-":{
  val = a-b;
  break;
  }
   case "/":{
    if(b==0){
      return "Math Error";
    }
  val = a/b;
  break;
  }
   case "*":{
  val = a*b;
  break;
  }
}
return val.toString();
}
function App() {
const [{currop,preop,op},dispatch] = useReducer(reducer,{currop:null,preop:null,op:null})
  return (
   <div className='calculator'>
  <div className='output'>
    <div className='previous-operand'>{preop} {op}</div>
    <div className='current-operand'>{currop}</div>
  </div>
  <button className='span-2' onClick={()=>{dispatch({type:"clear"})}}>AC</button>
  <button onClick={()=>{dispatch({type:"del"})}}>DEL</button>
  <Operation operation="/" dispatch={dispatch}/>
  <Adddigit digit="1" dispatch={dispatch}/>
  <Adddigit digit="2" dispatch={dispatch}/>
  <Adddigit digit="3" dispatch={dispatch}/>
  <Operation operation="*" dispatch={dispatch}/>
  <Adddigit digit="4" dispatch={dispatch}/>
  <Adddigit digit="5" dispatch={dispatch}/>
  <Adddigit digit="6" dispatch={dispatch}/>
  <Operation operation="+" dispatch={dispatch}/>
  <Adddigit digit="7" dispatch={dispatch}/>
  <Adddigit digit="8" dispatch={dispatch}/>
  <Adddigit digit="9" dispatch={dispatch}/>
  <Operation operation="-" dispatch={dispatch}/>
  <Adddigit digit="." dispatch={dispatch}/>
  <Adddigit digit="0" dispatch={dispatch}/>
  <button className='span-2'onClick={()=>{dispatch({type:"evaluate"})}}>=</button>
  </div>
  )
}

export default App
