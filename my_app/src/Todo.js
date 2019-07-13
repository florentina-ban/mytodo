import React from "react";
import "./all.css";
import { throwStatement, thisExpression } from "@babel/types";

export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.auto_ref=React.createRef();
        this.ck_ref=React.createRef();
        this.state={className:"nck" };
     };
     change_className = () => { 
            if (this.ck_ref.current.props.isChecked===true){
                this.setState({className:"ck"},()=>{});
            }
            else{
                this.setState({className:"nck"},()=>{});
            }
           
        
     };
    render(){
        return(
            <li className={this.state.className}> 
                <Checkbox id={this.props.id+'c'} todo_ref={this.props.ref}/>                   
                <strong>{this.props.id}  &nbsp; &nbsp;</strong> {this.props.text} &nbsp; &nbsp;{this.props.done.toString()} 
            </li>
            );
    };
}

export class Checkbox extends React.Component{
    constructor(props){
        super(props);
        this.state={isChecked:false}
        this.action=this.action.bind(this);
    }

    action () {
       this.setState({isChecked: !this.state.isChecked},  () => {});
        //const a =document.getElementById(this.props.id);
      
    }
    render(){
        return(
            <div>
                <input type="checkbox" id={this.props.id} value={this.state.isChecked} onChange={this.action()}/>     
            </div>
        );
    }
}

