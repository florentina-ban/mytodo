import React from 'react';
import './all.css';

function EmptyErr (props){
   return(
        <p className="errorClassComp">
            {props.errMessage}
        </p>
    );
}
export default EmptyErr;