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
    addToDo = (stuffToDo) =>{
        if (stuffToDo.text.length===0){
            //alert("please fill all the gaps");
        }
        else{
            let new_list=this.state.todos;
            new_list.push(stuffToDo);
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
                        <AddComponent addToDo={this.addToDo} id="add_id" allToDos={this.state.todos}/> 
                        {todos}     
                    </div>
                </div>
            </div>
            
        );
    }

}
