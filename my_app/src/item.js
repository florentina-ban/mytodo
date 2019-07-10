import React from "react";

export default class Item extends React.Component{
    constructor(props){
        super(props);
     };
    render(){
        return(
        <div className="item">
            <p>{this.props.id} {this.props.text} {this.props.status} </p>
        </div>
        );
    };
}

