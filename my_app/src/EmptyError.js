import React from 'react';
import './all.css';

export default class EmptyErr extends React.Component{
    constructor(props){
        super(props)
        this.state={errMessage:this.props.err};
    }
    render(){
        return(
            <p className="errorClassComp">
                {this.props.errMessage}
                {console.log("errMessage: ",this.props.errMessage)}
            </p>
        );
    }

}