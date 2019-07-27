import React from 'react';
import generateId from "./utils";
import EmptyError from "./EmptyError";
import styled from "styled-components";

const AddComp=styled.h3`
    border: 2px rgb(17, 105, 5) solid; 
    text-align: left;
    margin: 0;
    height: 80px;
    padding-top: 10px; 
`
export const MyLable=styled.span`
    background-color: rgb(17, 105, 5);
    color:rgb(161, 245, 51);
    padding: 4px;
    text-align: left;
    margin:2px;
`
const MyLable2=styled(MyLable)`
    background-color: ${props => props.error==="errorClass"? "rgb(17, 105, 5)" : "rgb(161, 245, 51)"};
    color:${props => props.error==="errorClass"? "rgb(161, 245, 51)" : "rgb(161, 245, 51)"};
    margin: 2px;
`
const BtnAdd=styled.input`
    background-color: rgb(11, 224, 107);
    margin:2px;
    cursor: pointer;
`

export default class AddComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={text:"",labelErrClass:"errorClass",empyErr:""};
        this.myRef=React.createRef();
    }
    hodValue = () => {
        this.setState({text:this.myRef.current.value, labelErrClass: this.myRef.current.value.length===0 ? "errorClass" : "noErrorClass" });      
        if (this.myRef.current.value.length>0)
            this.setState({emptyErr:""});
    }       
    addToDoCb = () =>{
        const todoText=this.myRef.current.value.trim();

        if (todoText.length===0){
            this.setState({emptyErr:"fill the gap and then press +"});
        }
        else{
            let idG=generateId(this.props.allToDos);
            document.getElementById("todo_id").value="";
            let stuff={
                text:todoText,
                id:idG,
                done:false
            }
            this.props.addToDo(stuff);
            this.setState({labelErrClass:"errorClass"},()=>{});
        }
    }
    render(){
        return(
            <AddComp>
                    <MyLable> What do you have to do? </MyLable>
                    <BtnAdd type='text' id="todo_id" ref={this.myRef} onChange={this.hodValue}></BtnAdd>
                    <BtnAdd type="button" id="add_button_id" value="+" onClick={this.addToDoCb} ></BtnAdd>
                    <MyLable2 error={this.state.labelErrClass}> not ready yet! </MyLable2>
                    <EmptyError errMessage={this.state.emptyErr} />
            </AddComp>
        );
    }
}