import React, {Component} from 'react';
import Todo from './Todo.js';
import lista from './constants.js';

export default class Layout extends Component{
    render(){
        const todos=lista.map((todo) => { return <Todo id={todo.id} text={todo.text} done={todo.done} key={`todo_${todo.id}`} ref={todo.id}/>});
        return(
            <div className="myCss">
                <h4 className="titlu">tiltlul listei</h4>
                <br></br>
                {todos}    
            </div>
        );
    }

}