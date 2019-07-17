import React from 'react';
import "./all.css";
import generateId from "./utils";

export default class AddComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={text:""};
    }
    hodValue = () => {
        this.setState({text:document.getElementById("todo_id").value},()=>{})
    }
    addToDoCb = () =>{
        let idG=generateId(this.props.allToDos);
              
        let stuff={
            text:this.state.text,
            id:idG,
            done:false
        }
        this.props.addToDo(stuff);
        document.getElementById("todo_id").value="";
    }
    render(){
        return(
            <div className="add_flex">
                <div className="child">
                    <label className="child_l">to do: </label>
                    <input  className="child_i" type='text' id="todo_id" onChange={this.hodValue}></input>
                    <input type="button" id="add_button_id" value="+" onClick={this.addToDoCb}></input>                    
                </div>

            </div>
        );
    }
}