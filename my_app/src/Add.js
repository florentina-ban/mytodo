import React from 'react';
import "./all.css";
import generateId from "./utils";
import EmptyError from "./EmptyError";

export default class AddComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={text:"",labelErrClass:"errorClass",empyErr:""};
    }
    hodValue = () => {
        this.setState({text:document.getElementById("todo_id").value, labelErrClass: document.getElementById("todo_id").value.length===0 ? "errorClass" : "noErrorClass" },()=>{console.log(this.state.labelErrClass)});      
        if (document.getElementById("todo_id").value.length>0)
            this.setState({emptyErr:""},()=>{console.log(this.state.emptyErr)});
    }       
    addToDoCb = () =>{
        if (this.state.text.length===0){
            this.setState({emptyErr:"fill the gap and then press +"},()=>{console.log(this.state.emptyErr)});
        }
        else{

            let idG=generateId(this.props.allToDos);
            document.getElementById("todo_id").value="";
            let stuff={
                text:this.state.text,
                id:idG,
                done:false
            }
            this.props.addToDo(stuff);
        }
    }
    render(){
        return(
            <div className="add_flex">
                <div className="child">
                    <label className="child_l">to do: </label>
                    <input  className="child_i" type='text' value={this.state.text} id="todo_id" onChange={this.hodValue}></input>
                    <input type="button" id="add_button_id" value="+" onClick={this.addToDoCb}></input>                    
                    <div>
                        <span className={this.state.labelErrClass}> not ready yet!</span>
                    </div>
                    <div>
                        <EmptyError errMessage={this.state.emptyErr} />
                    </div>
                </div>

            </div>
        );
    }
}