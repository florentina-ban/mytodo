import React, {Component} from 'react';
import Todo from './Todo.js';
import lista from './constants.js';
import Checkbox from './Item.js'

export default class Layout extends Component{
    render(){
        const todos=lista.map((todo) => { return <Todo id={todo.id} text={todo.text} done={todo.done} />});
        return(
            <div className="myCss">
                <h4 className="titlu">tiltlul listei</h4>
                <br></br>
                {todos}    
            </div>
        );
    }

}