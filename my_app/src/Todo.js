import React from "react";
import "./all.css";
import Delete from "./Delete";

export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={className:"nck" , isChecked:false};
         };
    changeClassName (){
        let cl=(this.state.isChecked? 'nck' : 'ck');
        this.setState({className:cl, isChecked: !this.state.isChecked});

    };
    deleteToDo(){
        this.props.removeToDo(this.props.id);
   }
    render(){
        return(
            <div>
            <li className={this.state.className}> 
                <input type='checkbox' id={this.props.id} onChange={this.changeClassName.bind(this)} /> 
                <strong>{this.props.id}  &nbsp; &nbsp;</strong> {this.props.text} &nbsp; &nbsp;{this.props.done.toString()} 
                &nbsp; &nbsp;
                <Delete id={this.props.id} removeToDo={this.deleteToDo.bind(this)}/>
            </li>
            </div>
            );
    };
}
