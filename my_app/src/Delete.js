import React from "react";
import './all.css';

function Delete(props){
    return(
        <span className='spanclass' onClick={props.removeToDo.bind(this,props.id)}> delete? </span>
    );
}
export default Delete;