import React from "react";
import './all.css';

export default class Delete extends React.Component{
    render(){
        return(
            <span className='spanclass' onClick={this.props.removeToDo.bind(this,this.props.id)}> delete? </span>
        );
    }

}