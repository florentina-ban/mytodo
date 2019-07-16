import React from "react";
import './all.css';

export default class Delete extends React.Component{
    render(){
        return(
            <span className='spanclass' onClick={this.props.remove_f.bind(this,this.props.id)}> delete? </span>
        );
    }

}