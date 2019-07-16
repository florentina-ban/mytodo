import React, {Component} from 'react';
import Todo from './Todo.js';
import lista from './constants.js';

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
        this.setState({todos:new_list});
    }
    render(){
        const list=this.state.todos;
        const todos=list.map((todo) => { return <Todo id={todo.id} text={todo.text} done={todo.done} key={`todo_${todo.id}`} ref={todo.id} remove_f={this.remove_function.bind(this)}/>});
        return(
            <div className="myCss">
                <h4 className="titlu">tiltlul listei</h4>
                <br></br>
                {todos}    
            </div>
        );
    }

}
