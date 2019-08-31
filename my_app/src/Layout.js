import {AllComp, ColorButton, ColorComp, HeaderComp} from './LayoutStyle';
import {LayoutAddBtn, ListComp, LittleTitle} from './LayoutStyle';
import React, {Component} from 'react';
import {getLista, getString} from './utils.js';
import AddComponent from './Add';
import MyTitle from './TitleComp.js';
import PropTypes from 'prop-types';
import Todo from './Todo.js';

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
        const {checkedTodos} = this.state;
        if (checkedTodos.length > 1) {
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
                ck
                color={color}
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
                        <HeaderComp>
                            <LayoutAddBtn
                                color={color}
                                onClick={() => {
                                    this.addLayout();
                                }}
                                value="+"
                            />
                            <LayoutAddBtn
                                color={color}
                                onClick={() => {
                                    deleteLayoutFunction(id);
                                }}
                                value="X"
                            />
                        </HeaderComp>
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
                    <ColorComp>
                        {this.getColorButton('color1', color)}
                        {this.getColorButton('color2', color)}
                        {this.getColorButton('color3', color)}
                        {this.getColorButton('color4', color)}
                        {this.getColorButton('color5', color)}
                        {this.getColorButton('color6', color)}
                    </ColorComp>
                </AllComp>
            </div>
        );
    }
}
