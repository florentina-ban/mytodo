import React, {Component} from 'react';
import Todo from './Todo.js';
import lista from './constants.js';
import AddComponent from "./Add";

export default class Layout extends Component{
    constructor(){
        super();
        this.state={todos:lista};
    }
    remove_function = (id)=>{
        var new_list=[];
        for (var i =0; i<this.state.todos.length; i++){
            if (this.state.todos[i].id !== id)
                new_list.push(this.state.todos[i]);
        }
        this.setState({todos:new_list},()=>{});
    }
    add_function = () =>{
        const id=document.getElementById("id_id").value;
        const text=document.getElementById("todo_id").value;
        var done=document.getElementById("done_id").value;
        document.getElementById("id_id").value="";
        document.getElementById("todo_id").value="";
        document.getElementById("done_id").value="";
        if (id.length===0 || text.length===0){
            alert("please fill all the gaps");
        }
        else{
            if (done==="y" || done==="Y")
                done=true;
            else
                done=false;

            console.log(id, text, done);
            var new_list=this.state.todos;
            var todo={
                id:id,
                text:text,
                done:done
            }
            new_list.push(todo);
            this.setState({todos:new_list},()=>{});
        }
    }
    render(){
        const list=this.state.todos;
        const todos=list.map((todo) => { return <Todo id={todo.id} text={todo.text} done={todo.done} key={`todo_${todo.id}`} ref={todo.id} remove_f={this.remove_function.bind(this)}/>});
        return(
            <div className="myCss">
                <div>
                    <h4 className="titlu">tiltlul listei</h4>
                    <br></br>
                    {todos}   
                </div>
                <AddComponent add_f={this.add_function.bind(this)} id="add_id"/> 
            </div>
            
        );
    }

}
