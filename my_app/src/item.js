import React from "react";
import "./item.css"

export default class Item extends React.Component{
    constructor(props){
        super(props);
     };
    render(){
        return(
        <div>
            <p><strong>{this.props.id}</strong> {this.props.text} {this.props.status} </p>
        </div>
        );
    };
}