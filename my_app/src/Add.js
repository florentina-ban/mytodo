import React from 'react';
import "./all.css";
import generateId from "./utils";
import EmptyError from "./EmptyError";

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
        }
    }
    render(){
        return(
            <div className="add_flex">
                <div className="child">
                    <label className="child_l">to do: </label>
                    <input  className="child_i" type='text' value={this.state.text} id="todo_id" ref={this.myRef} onChange={this.hodValue}></input>
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