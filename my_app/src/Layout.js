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
const LittleTitle=styled(ListTitle)`
    width: 30%;
    background-color: rgb(161, 245, 51);
    color:  rgb(17, 105, 5);
    margin-left: 20px;
    font-size: 15px;
    text-align: left;
    border: 0px;
    margin-bottom: 0;
`
export default class Layout extends Component{
    constructor(){
        super();
        this.state={todos:lista, checkedTodos:[]};
    }
    removeToDo = (id) => {
        let new_list=[];
        new_list=this.state.todos.filter(todo=>todo.id!==id);
        if (new_list.length<this.state.todos.length)
            this.setState({todos:new_list});
        else{
            new_list=this.state.checkedTodos.filter(todo=>todo.id!==id);
            this.setState({checkedTodos:new_list});
        }
    }
    setChecked = (id) => {
        let new_todo = this.state.todos.filter(todo => todo.id===id)[0];
        const cList=Array.from(this.state.checkedTodos);
        cList.push(new_todo);
        this.setState({checkedTodos:cList},this.removeToDo(id));
    }
    setUnChecked = (id) => {
        let new_todo = this.state.checkedTodos.filter(todo => todo.id===id)[0];
        const cList=Array.from(this.state.checkedTodos);
        const newcList=cList.filter(todo => todo.id!==id);
        let newTodos=this.state.todos;
        newTodos.push(new_todo);
        this.setState({checkedTodos:newcList,todos:newTodos},()=>{});
    }
    addToDo = (stuffToDo) => {
        this.state.todos.push(stuffToDo);
        this.setState({todos:this.state.todos});
    }
    render(){
        const list=this.state.todos;
        const todos=list.map((todo) => { return <Todo id={todo.id} text={todo.text} done={todo.done} key={`todo_${todo.id}`} ck={false} ref={todo.id} removeToDo={this.removeToDo} setChecked={this.setChecked}/>});
        const cList=Array.from(this.state.checkedTodos);
        const checked=cList.map((todo) => { return <Todo id={todo.id} text={todo.text} done={todo.done} key={`todo_${todo.id}`} ck={true} ref={todo.id} removeToDo={this.removeToDo} setChecked={this.setUnChecked}/>});
        return(
            <div>
                <ListTitle>
                    My ToDO List
                </ListTitle>
                <ListComp>
                    <LittleTitle>Stuff to do: </LittleTitle>
                    {todos} 
                    <AddComponent addToDo={this.addToDo} id="add_id" allToDos={this.state.todos}/> 
                    <LittleTitle>Stuff already done:</LittleTitle>
                    {checked}
                </ListComp>
            </div>
            
        );
    }

}
