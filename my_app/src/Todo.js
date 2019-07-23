import React from "react";
import "./all.css";
import Delete from "./Delete";
import styled from "styled-components"

const MyTodoItem=styled.span`
    padding: 3px;
    margin: 3px;
    text-align: left;
    background-color: ${ props => props.cheked==="nck"? "rgb(118, 230, 44)" : "rgb(242, 203, 48)"};
    text-decoration: ${props => props.cheked==="nck"? "none" : "line-through" };
`
const ListStyle=styled.li`
    list-style:none;
    margin:5px;
`
const CheckBox=styled.input`
    cursor:pointer;
`

export default class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={className:"nck" , isChecked:false};
         }

    changeClassName (){
        let cl=(this.state.isChecked? 'nck' : 'ck');
        this.setState({className:cl, isChecked: !this.state.isChecked});

    }
    deleteToDo(){
        this.props.removeToDo(this.props.id);
   }
    render(){
        return(
             <ListStyle>
                <CheckBox type='checkbox' id={this.props.id} onChange={this.changeClassName.bind(this)}/>
                <MyTodoItem cheked={this.state.className}>
                    <strong> {this.props.id}  </strong>&nbsp; &nbsp; {this.props.text} &nbsp; &nbsp;{this.props.done.toString()} &nbsp; &nbsp; </MyTodoItem>
                <Delete id={this.props.id} removeToDo={this.deleteToDo.bind(this)}/>
            </ListStyle>   
            );
    }
}
