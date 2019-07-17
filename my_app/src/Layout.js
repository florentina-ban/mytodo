import React, {Component} from 'react';
import Todo from './Todo.js';
import lista from './constants.js';
import AddComponent from "./Add";

export default class Layout extends Component{
    constructor(){
        super();
        this.state={todos:lista};
    }
    removeToDo = (id) => {
        let new_list=[];
        for (var i =0; i<this.state.todos.length; i++){
            if (this.state.todos[i].id !== id)
                new_list.push(this.state.todos[i]);
        }
        this.setState({todos:new_list});
    }
    addToDo = () =>{
        const id=document.getElementById("id_id").value;
        const text=document.getElementById("todo_id").value;
        let done=document.getElementById("done_id").value;
        document.getElementById("id_id").value="";
        document.getElementById("todo_id").value="";
        document.getElementById("done_id").value="";
        if (id.length===0 || text.length===0){
            alert("please fill all the gaps");
        }
        else{
            done= (done==='y' || done==='Y')? true : false;
            let new_list=this.state.todos;
            let todo={
                id:id,
                text:text,
                done:done
            }
            new_list.push(todo);
            this.setState({todos:new_list});
        }
    }
    render(){
        const list=this.state.todos;
        const todos=list.map((todo) => { return <Todo id={todo.id} text={todo.text} done={todo.done} key={`todo_${todo.id}`} ref={todo.id} removeToDo={this.removeToDo}/>});
        return(
            <div>
                <h4 className="titlu">tiltlul listei</h4>
                <div className="myCss">
                    <div className="lista">
                        {todos}     
                    </div>
                    <div>
                        <AddComponent addToDo={this.addToDo} id="add_id" /> 
                    </div>
                </div>
            </div>
            
        );
    }

}
