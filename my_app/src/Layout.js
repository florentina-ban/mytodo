import React, {Component} from 'react';
import {getLista, getString} from './utils.js';
import AddComponent from './Add';
import MyTitle from './TitleComp.js';
import PropTypes from 'prop-types';
import Todo from './Todo.js';
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
    width: 300px;
    min-height: 300px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
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
    margin-left: 10px;
    border: ${(props) => {
        if (props.color === props.backgroundColor) {
            return '1px black solid';
        }
        return 'none';
    }
};
`,
    ColorComponent = styled.form`
    display: flex;
`,
    HeaderComponent = styled.form`
    display: flex;
    justify-content: space-between;
    width: 298px;
`,
    LayoutButtonAdd = styled(ColorButton)`
    margin: 10px;
    margin-left: 20px;
    font-weight: bold;
    border: none;
`,
    ListComp = styled.form`
    font: normal 12px sans-serif;
`,
    ListTitle = styled.h1`
    background-color: #f1f3f4;
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
    static propTypes = {
        'addLayoutFunction': PropTypes.func,
        'deleteLayoutFunction': PropTypes.func,
        'id': PropTypes.string
    }

    static defaultProps = {
        'addLayoutFunction': () => null,
        'deleteLayoutFunction': () => null,
        'id': ''
    }

    constructor (props) {
        super(props);
        let checkedTodos = [],
            todos = [];
        const {id} = this.props,
            aStore = window.localStorage,
            color = typeof aStore.getItem(`color${id}`) === 'undefined'
                ? 'color6'
                : aStore.getItem(`color${id}`),
            remakeLista = getLista(window.localStorage.getItem(`lista${id}`));
        todos = remakeLista.filter((todo) => todo.done === false);
        checkedTodos = remakeLista.filter((todo) => todo.done === true);
        this.state = {checkedTodos,
            color,
            todos};
    }

    saveDataInStorage = () => {
        const {checkedTodos, todos} = this.state,
            {id} = this.props,
            listaCheck = getString(checkedTodos),
            listaUncheck = getString(todos),
            myStorage = window.localStorage;
        if (listaUncheck.length && listaCheck.length) {
            myStorage.setItem(`lista${id}`, `${listaUncheck};${listaCheck}`);
        } else
        if (listaUncheck.length) {
            window.localStorage.setItem(`lista${id}`, listaUncheck);
        } else
        if (listaCheck.length) {
            window.localStorage.setItem(`lista${id}`, listaCheck);
        } else {
            window.localStorage.setItem(`lista${id}`, []);
        }

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
        const {id} = this.props;
        this.setState({color}, () => {
            window.localStorage.setItem(`color${id}`, color);
        });
    }

    getColorButton = (color, backgroundColor) => <ColorButton
        backgroundColor={backgroundColor}
        color={color}
        onClick={() => {
            this.changeColor(color);
        }}
        type="button"
    />

    addLayout = () => {
        const {addLayoutFunction} = this.props;
        addLayoutFunction();
    }

    render () {
        let {color} = this.state;
        if (color === null) {
            color = 'color6';
        }
        const {checkedTodos} = this.state,
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
            {id, deleteLayoutFunction} = this.props,
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
                <AllComp color={color}>
                    <form>
                        <HeaderComponent>
                            <LayoutButtonAdd
                                color={color}
                                onClick={() => {
                                    this.addLayout();
                                }}
                                value="+"
                            />
                            <LayoutButtonAdd
                                color={color}
                                onClick={() => {
                                    deleteLayoutFunction(id);
                                }}
                                value="X"
                            />
                        </HeaderComponent>
                        <ListComp color={color}>
                            <MyTitle
                                color={color}
                                id={id}
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
                    </form>
                    <ColorComponent>
                        {this.getColorButton('color1', color)}
                        {this.getColorButton('color2', color)}
                        {this.getColorButton('color3', color)}
                        {this.getColorButton('color4', color)}
                        {this.getColorButton('color5', color)}
                        {this.getColorButton('color6', color)}
                    </ColorComponent>
                </AllComp>
            </div>
        );
    }
}
