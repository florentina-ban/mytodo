import React, {Component} from "react";
import AddComponent from "./Add";
import Todo from "./Todo.js";
import lista from "./constants.js";
import styled from "styled-components";

const ListComp = styled.p`
    font: normal 12px sans-serif;
    margin: auto;
    border: 2px rgb(17, 105, 5) solid; 
    background-color: rgb(163, 255, 43);  
    padding:10px;
    width: 60%;
    justify-content: center;
    align-items:flex-start;
`,
    ListTitle = styled.h1`
    background-color: rgb(17, 105, 5);
    width: 60%;
    margin: auto;
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 2px rgb(161, 245, 51) solid;
    color: rgb(161, 245, 51);
`,
    LittleTitle = styled(ListTitle)`
    width: 30%;
    background-color: rgb(163, 255, 43);
    color:  rgb(17, 105, 5);
    margin-left: 20px;
    font-size: 15px;
    text-align: left;
    border: 0px;
    margin-bottom: 0;
`;
export default class Layout extends Component {
    constructor () {
        super();
        this.state = {"checkedTodos": [],
            "todos": lista};
        this.removeToDo = this.removeToDo.bind(this);
        this.setChecked = this.setChecked.bind(this);
        this.setUnChecked = this.setUnChecked.bind(this);
        this.addToDo = this.addToDo.bind(this);
    }

    removeToDo (id) {
        const {checkedTodos} = this.state,
            {todos} = this.state;
        let [...newList] = todos.filter((todo) => todo.id !== id);
        if (newList.length < todos.length) {
            this.setState({"todos": newList});
        } else {
            newList = checkedTodos.filter((todo) => todo.id !== id);
            this.setState({"checkedTodos": newList});
        }
    }

    setChecked (id) {
        const {checkedTodos} = this.state,
            {todos} = this.state,
            [newTodo] = todos.filter((todo) => todo.id === id);
        checkedTodos.push(newTodo);
        this.setState({checkedTodos}, this.removeToDo(id));
    }

    setUnChecked (id) {
        const {checkedTodos} = this.state,
            {todos} = this.state,
            vnewcList = checkedTodos.filter((todo) => todo.id !== id),
            [vnewTodo] = checkedTodos.filter((todo) => todo.id === id);
        todos.push(vnewTodo);
        this.setState({"checkedTodos": vnewcList,
            todos});
    }

    addToDo (stuffToDo) {
        const {todos} = this.state;
        todos.push(stuffToDo);
        this.setState({todos});
    }

    render () {
        const {checkedTodos} = this.state,
            checked = checkedTodos.map((todo) => <Todo
                done={todo.done}
                id={todo.id}
                key={`todo_${todo.id}`}
                ref={todo.id}
                removeToDo={this.removeToDo}
                setChecked={this.setUnChecked}
                text={todo.text}
            />),
            {todos} = this.state,
            todosMod = todos.map((todo) => <Todo
                ck={false}
                done={todo.done}
                id={todo.id}
                key={`todo_${todo.id}`}
                ref={todo.id}
                removeToDo={this.removeToDo}
                setChecked={this.setChecked}
                text={todo.text}
            />);
        return (
            <div>
                <ListTitle>
                    <p>
                        {"My ToDO List"}
                    </p>
                </ListTitle>
                <ListComp>
                    <LittleTitle>
                        <p>
                            {"Stuff to do:"}
                        </p>
                    </LittleTitle>
                    {todosMod}
                    <AddComponent
                        addToDo={this.addToDo}
                        allToDos={checkedTodos}
                        id="add_id"
                    />
                    <LittleTitle>
                        <p>
                            {"Stuff already done:"}
                        </p>
                    </LittleTitle>
                    {checked}
                </ListComp>
            </div>
        );
    }
}
