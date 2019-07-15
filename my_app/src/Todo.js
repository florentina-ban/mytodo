import React from "react";
<<<<<<< HEAD
import "./all.css"
//import { throwStatement, thisExpression } from "@babel/types";

=======
import "./all.css";
>>>>>>> refb2

export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.auto_ref=React.createRef();
        this.ck_ref=React.createRef();
        this.state={className:"nck" , isChecked:false};
         };
    change_className = () => {
        var isc=false;
        var cl='nck';
         if (this.state.isChecked===false){
            isc=true;
            cl='ck';
           }
        this.setState({className:cl,isChecked:isc},()=>{});
    };
    render(){
        return(
            <div>
            <li className={this.state.className}> 
                <input type='checkbox' id={this.props.id} onChange={this.change_className.bind(this)} /> 
                <strong>{this.props.id}  &nbsp; &nbsp;</strong> {this.props.text} &nbsp; &nbsp;{this.props.done.toString()} 
            </li>
            </div>
            );
    };
}
/*

export class Checkbox extends React.Component{
    constructor(props){
        super(props);
        this.state={isChecked:false}
        this.action=this.action.bind(this);
    }

    action(){
        
        this.setState((state,props) => { return {isChecked: !state.isChecked}; });
        //const a =document.getElementById(this.props.id);
      
    }
    componentDidUpdate(){

    }
    render(){
        return(
            <div>
                <input type="checkbox" id={this.props.id} value={this.isChecked} onChange={this.action()}/>     
            </div>
        );
    }
}
*/
