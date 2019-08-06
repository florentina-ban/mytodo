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
    }

    removeToDo = (id) => {
        let [...newList] = this.state.todos.filter((todo) => todo.id !== id);
        if (newList.length < this.state.todos.length) {
            this.setState({"todos": newList});
        } else {
            newList = this.state.checkedTodos.filter((todo) => todo.id !== id);
            this.setState({"checkedTodos": newList});
        }
    }

    setChecked = (id) => {
        const newTodo = this.state.todos.filter((todo) => todo.id === id)[0],
            cList = Array.from(this.state.checkedTodos);
        cList.push(newTodo);
        this.setState({"checkedTodos": cList}, this.removeToDo(id));
    }

    setUnChecked = (id) => {
        const cList = Array.from(this.state.checkedTodos),
            newcList = cList.filter((todo) => todo.id !== id),
            newTodo = this.state.checkedTodos.filter((todo) => todo.id === id)[0],
            newTodos = this.state.todos;
        newTodos.push(newTodo);
        this.setState({"checkedTodos": newcList,
            "todos": newTodos}, () => {});
    }

    addToDo = (stuffToDo) => {
        const [...todos] = this.state.todos;
        todos.push(stuffToDo);
        this.state.todos.push(stuffToDo);
        this.setState({todos});
    }

    render () {
        const [...cList] = Array.from(this.state.checkedTodos),
            checked = cList.map((todo) => <Todo
                ck={true}
                done={todo.done}
                id={todo.id}
                key={`todo_${todo.id}`}
                ref={todo.id}
                removeToDo={this.removeToDo}
                setChecked={this.setUnChecked}
                text={todo.text}
            />),
            [...list] = this.state.todos,
            todos = list.map((todo) => <Todo
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
                    {todos}
                    <AddComponent
                        addToDo={this.addToDo}
                        allToDos={list}
                        id="add_id"
                    />
                    <LittleTitle>
                        {" "}
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
