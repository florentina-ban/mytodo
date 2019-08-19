import React, {Component} from 'react';
import AddComponent from './Add';
import MyTitle from './TitleComp.js';
import Todo from './Todo.js';
import lista from './constants.js';
import styled from 'styled-components';

const AllComp = styled.form`
    background-color: ${(props) => {
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'yellow') {
            return 'rgb(202, 212, 13)';
        }
        return 'rgb(18, 222, 113)';
    }
};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50%;
    margin: auto;
`,
    ColorButton = styled.input`
    background-color:  ${(props) => {
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'yellow') {
            return 'rgb(202, 212, 13)';
        }
        return 'rgb(18, 222, 113)';
    }
};
    cursor: pointer;
    width: 100%; 
    height: 20px;
`,
    ColorComponent = styled.form`
    width: 15%;
    font: normal 12px sans-serif;
`,
    ListComp = styled.form`
    font: normal 12px sans-serif;
    width: 85%;
`,
    ListTitle = styled.h1`
    background-color: rgb(17, 105, 5);
    margin: auto;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 2px rgb(161, 245, 51) solid;
    color: rgb(161, 245, 51);
`,
    LittleTitle = styled(ListTitle)`
    width: 60%;
    background-color:${(props) => {
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'yellow') {
            return 'rgb(202, 212, 13)';
        }
        return 'rgb(18, 222, 113)';
    }
};
    color:  rgb(17, 105, 5);
    margin-left: 20px;
    font-size: 15px;
    text-align: left;
    border: 0px;
    margin-bottom: 0;
    padding: 0;
`;
export default class Layout extends Component {
    constructor () {
        super();
        let checkedTodos = [],
            todos = [];
        todos = lista.filter((todo) => todo.done === false);
        checkedTodos = lista.filter((todo) => todo.done === true);
        this.state = {checkedTodos,
            'color': 'green',
            todos};
    }

    removeToDo = (id) => {
        const {checkedTodos} = this.state,
            {todos} = this.state;
        let [...newList] = todos.filter((todo) => todo.id !== id);
        if (newList.length < todos.length) {
            this.setState({'todos': newList});
        } else {
            newList = checkedTodos.filter((todo) => todo.id !== id);
            this.setState({'checkedTodos': newList});
        }
    }

    setChecked = (id) => {
        const {checkedTodos} = this.state,
            {todos} = this.state,
            [newTodo] = todos.filter((todo) => todo.id === id);
        newTodo.done = true;
        checkedTodos.push(newTodo);
        this.setState({checkedTodos}, this.removeToDo(id));
    }

    setUnChecked = (id) => {
        const {checkedTodos} = this.state,
            {todos} = this.state,
            vnewcList = checkedTodos.filter((todo) => todo.id !== id),
            [vnewTodo] = checkedTodos.filter((todo) => todo.id === id);
        vnewTodo.done = false;
        todos.push(vnewTodo);
        this.setState({'checkedTodos': vnewcList,
            todos});
    }

    addToDo = (stuffToDo) => {
        const {todos} = this.state;
        todos.push(stuffToDo);
        this.setState({todos});
    }

    modifyTextInArray = (par) => {
        const rate = 1;
        for (let counter = 0; counter < par.myArray.length; counter += rate) {
            if (par.myArray[counter].id === par.id) {
                par.myArray[counter].text = par.newText;
                if (par.identifier === 'todos') {
                    this.setState({'todos': par.myArray});
                }
                this.setState({'checkedTodos': par.myArray});
                return true;
            }
        }
        return false;
    }

    modifyText = (id, newText) => {
        const {checkedTodos} = this.state,
            {todos} = this.state;
        if (!this.modifyTextInArray({id,
            'identifier': 'todos',
            'myArray': todos,
            newText})) {
            this.modifyTextInArray({id,
                'identifier': 'other',
                'myArray': checkedTodos,
                newText});
        }

    }

    getNumberOfChecked = (color) => {
        const {checkedTodos} = this.state,
            one = 1;
        if (checkedTodos.length > one) {
            return (
                <LittleTitle color={color}>
                    <p>
                        {checkedTodos.length}
                        {' '}
                        {'todos already done:'}
                    </p>
                </LittleTitle>
            );
        }
        if (checkedTodos.length) {
            return (
                <LittleTitle color={color}>
                    <p>
                        {checkedTodos.length}
                        {' '}
                        {'todo already done:'}
                    </p>
                </LittleTitle>
            );
        }
        return (
            <p />
        );
    }

    changeColor = (color) => {
        this.setState({color});
    }

    render () {
        const {checkedTodos, color} = this.state,
            checked = checkedTodos.map((todo) => <Todo
                color={color}
                done={todo.done}
                id={todo.id}
                key={`todo_${todo.id}`}
                modifyText={this.modifyText}
                ref={todo.id}
                removeToDo={this.removeToDo}
                setChecked={this.setUnChecked}
                text={todo.text}
            />),
            {todos} = this.state,
            todosMod = todos.map((todo) => <Todo
                ck={false}
                color={color}
                done={todo.done}
                id={todo.id}
                key={`todo_${todo.id}`}
                modifyText={this.modifyText}
                ref={todo.id}
                removeToDo={this.removeToDo}
                setChecked={this.setChecked}
                text={todo.text}
            />);
        return (
            <div>
                <ListTitle>
                    {'My ToDo lists'}
                </ListTitle>
                <AllComp color={color}>
                    <ListComp color={color}>
                        <MyTitle
                            color={color}
                        />
                        {todosMod}
                        <AddComponent
                            addToDo={this.addToDo}
                            allToDos={checkedTodos}
                            color={color}
                            id="add_id"
                        />
                        {this.getNumberOfChecked(color)}
                        {checked}
                    </ListComp>
                    <ColorComponent>
                        <ColorButton
                            color="green"
                            onClick={() => {
                                this.changeColor('green');
                            }}
                            type="button"
                            value="Try it!"
                        />
                        <ColorButton
                            color="blue"
                            onClick={() => {
                                this.changeColor('blue');
                            }}
                            type="button"
                            value="Try it!"
                        />
                        <ColorButton
                            color="yellow"
                            onClick={() => {
                                this.changeColor('yellow');
                            }}
                            type="button"
                            value="Try it!"
                        />
                    </ColorComponent>
                </AllComp>
            </div>
        );
    }
}
