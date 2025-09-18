function Adddigit({digit,dispatch}){
return(
    <button onClick={()=>{dispatch({type:"adddigit",payload:digit})}}>{digit}</button>
)
}
export default Adddigit;
