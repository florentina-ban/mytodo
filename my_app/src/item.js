import React from "react";
import "./all.css"
import { throwStatement, thisExpression } from "@babel/types";

export default class Item extends React.Component{
    constructor(props){
        super(props);
        this.isChecked=false;
        this.state={className:"nck"};
     };
     action = () =>{

     }
    render(){
        var namecheck=this.props.id;
        return(
            <li className={this.state.className}> 
                <strong>{this.props.id}</strong> {this.props.text} {this.props.status} 
                <this.ck />
                <br></br>
            </li>
            );
    };
}
