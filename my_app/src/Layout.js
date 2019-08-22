import React, {Component} from 'react';
import {getLista, getString} from './utils.js';
import AddComponent from './Add';
import MyTitle from './TitleComp.js';
import Todo from './Todo.js';
// Import lista from './constants.js';
import styled from 'styled-components';

const AllComp = styled.form`
    background-color: ${(props) => {
        switch (props.color) {
        case 'color1':
            return '#5ac18e';
        case 'color2':
            return '#ffc0cb';
        case 'color3':
            return '#00dce0';
        case 'color4':
            return '#9886a7';
        case 'color5':
            return '#79bbb9';
        default:
            return '#fa8072';
        }
    }
};
    width: 30%;
    margin: auto;
`,
    ColorButton = styled.input`
    background-color: ${(props) => {
        switch (props.color) {
        case 'color1':
            return '#5ac18e';
        case 'color2':
            return '#ffc0cb';
        case 'color3':
            return '#00dce0';
        case 'color4':
            return '#9886a7';
        case 'color5':
            return '#79bbb9';
        default:
            return '#fa8072';
        }
    }
};
    cursor: pointer;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 0;
`,
    ColorComponent = styled.form`
    font: normal 12px sans-serif;
    display: flex;
`,
    ListComp = styled.form`
    font: normal 12px sans-serif;
`,
    ListTitle = styled.h1`
    background-color: #8f8585;
    margin: auto;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 0;
    color: #5f6368;
`,
    LittleTitle = styled(ListTitle)`
    width: 60%;
    background-color: ${(props) => {
        switch (props.color) {
        case 'color1':
            return '#5ac18e';
        case 'color2':
            return '#ffc0cb';
        case 'color3':
            return '#00dce0';
        case 'color4':
            return '#9886a7';
        case 'color5':
            return '#79bbb9';
        default:
            return '#fa8072';
        }
    }
};
    color:  #5f6368;
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
        const color = window.localStorage.getItem('color'),
            // Window.localStorage.setItem('lista', getString(lista));
            remakeLista = getLista(window.localStorage.getItem('lista'));
        // Window.localStorage.setItem('color','color6');
        todos = remakeLista.filter((todo) => todo.done === false);
        checkedTodos = remakeLista.filter((todo) => todo.done === true);
        this.state = {checkedTodos,
            color,
            todos};
    }

    saveDataInStorage = () => {
        const {checkedTodos, todos} = this.state,
            listaChecked = getString(checkedTodos),
            listaUnchecked = getString(todos),
            listaZ = `${listaUnchecked};${listaChecked}`,
            myStorage = window.localStorage;
        myStorage.setItem('lista', listaZ);
    }

    removeToDo = (id) => {
        const {checkedTodos} = this.state,
            {todos} = this.state;
        let [...newList] = todos.filter((todo) => todo.id !== id);
        if (newList.length < todos.length) {
            this.setState({'todos': newList}, () => {
                this.saveDataInStorage();
            });
        } else {
            newList = checkedTodos.filter((todo) => todo.id !== id);
            this.setState({'checkedTodos': newList}, () => {
                this.saveDataInStorage();
            });
        }
    }

    setChecked = (id) => {
        const {checkedTodos} = this.state,
            {todos} = this.state,
            vnewList = todos.filter((todo) => todo.id !== id),
            [newTodo] = todos.filter((todo) => todo.id === id);
        newTodo.done = true;
        checkedTodos.push(newTodo);
        this.setState({checkedTodos,
            'todos': vnewList}, () => {
            this.saveDataInStorage();
        });
    }

    setUnChecked = (id) => {
        const {checkedTodos} = this.state,
            {todos} = this.state,
            vnewcList = checkedTodos.filter((todo) => todo.id !== id),
            [vnewTodo] = checkedTodos.filter((todo) => todo.id === id);
        vnewTodo.done = false;
        todos.push(vnewTodo);
        this.setState({'checkedTodos': vnewcList,
            todos}, () => {
            this.saveDataInStorage();
        });
    }

    addToDo = (stuffToDo) => {
        const {todos} = this.state;
        todos.push(stuffToDo);
        this.setState({todos}, () => {
            this.saveDataInStorage();
        });
    }

    modifyTextInArray = (par) => {
        const rate = 1;
        for (let counter = 0; counter < par.myArray.length; counter += rate) {
            if (par.myArray[counter].id === par.id) {
                par.myArray[counter].text = par.newText;
                if (par.identifier === 'todos') {
                    this.setState({'todos': par.myArray}, () => {
                        this.saveDataInStorage();
                    });
                } else {
                    this.setState({'checkedTodos': par.myArray}, () => {
                        this.saveDataInStorage();
                    });
                }
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
                        {' todos already done:'}
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
        this.setState({color}, () => {
            window.localStorage.setItem('color', color);
        });
    }

    getColorButton = (color) => <ColorButton
        color={color}
        onClick={() => {
            this.changeColor(color);
        }}
        type="button"
    />


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
                        {this.getColorButton('color1')}
                        {this.getColorButton('color2')}
                        {this.getColorButton('color3')}
                        {this.getColorButton('color4')}
                        {this.getColorButton('color5')}
                        {this.getColorButton('color6')}
                    </ColorComponent>
                </AllComp>
            </div>
        );
    }
}
