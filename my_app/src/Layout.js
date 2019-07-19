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
        new_list=this.state.todos.filter(todo=>todo.id!==id);
        this.setState({todos:new_list});
    }
    addToDo = (stuffToDo) =>{
        this.state.todos.push(stuffToDo);
        this.setState({todos:this.state.todos});
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
