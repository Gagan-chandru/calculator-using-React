function Operation({operation,dispatch}){
return(
    <button onClick={()=>{dispatch({type:"operation",payload:operation})}}>{operation}</button>
)
}
export default Operation;