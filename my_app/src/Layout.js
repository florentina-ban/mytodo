import React, {Component} from 'react';
import Todo from './Todo.js';
import lista from './constants.js';
import AddComponent from "./Add";
import styled from "styled-components";
const ListTitle=styled.h1`
    background-color: rgb(17, 105, 5);
    width: 60%;
    margin: auto;
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 2px rgb(161, 245, 51) solid;
    color: rgb(161, 245, 51);
`
const ListComp=styled.p`
    font: normal 12px sans-serif;
    margin: auto;
    border: 2px rgb(17, 105, 5) solid; 
    background-color: rgb(163, 255, 43);  
    padding:10px;
    width: 60%;
    justify-content: center;
    align-items:flex-start;
`
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
                <ListTitle>
                    My ToDO List
                </ListTitle>
                <ListComp>
                    <AddComponent addToDo={this.addToDo} id="add_id" allToDos={this.state.todos}/> 
                    {todos}     
                </ListComp>
            </div>
            
        );
    }

}
