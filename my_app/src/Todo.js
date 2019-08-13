import DeleteTodo from './Delete';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CheckBox = styled.input`
    cursor: pointer;
`,
    ListStyle = styled.li`
    list-style:none;
    margin:5px;
`,
    MyInput = styled.input`
    background-color: rgb(163, 255, 43);
    border : 0;
    width: 100px;
`,
    MyTodoItem = styled.span`
    padding: 3px;
    margin: 3px;
    text-align: left;
    background-color: ${(props) => {
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'blue') {
            return 'rgb(18, 222, 113)';
        }
        return 'rgb(202, 212, 13)';
    }
};
    text-decoration: ${(props) => {
        if (props.cheked === 'nck') {
            return 'none';
        }
        return 'line-through';
    }
};
`;

export default class Todo extends React.Component {

    static propTypes = {
        'ck': PropTypes.bool,
        'color': PropTypes.string,
        'done': PropTypes.bool,
        'id': PropTypes.string,
        'modifyText': PropTypes.func,
        'removeToDo': PropTypes.func,
        'setChecked': PropTypes.func,
        'text': PropTypes.string
    }

    static defaultProps = {
        'ck': true,
        'color': '',
        'done': true,
        'id': '',
        'modifyText': () => null,
        'removeToDo': () => null,
        'setChecked': () => null,
        'text': ''
    }

    constructor (props) {
        super(props);
        const {text} = this.props;
        if (props.ck === false) {
            this.state = {'className': 'nck',
                'isChecked': false,
                'isClicked': false,
                text};
        } else {
            this.state = {'className': 'ck',
                'isChecked': true,
                'isClicked': false,
                text};
        }
        this.handleChangeClassName = this.handleChangeClassName.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getHtmlTag = this.getHtmlTag.bind(this);
        this.handleSaveModifiedTodo = this.handleSaveModifiedTodo.bind(this);
        this.inputRef = React.createRef();
    }

    handleChangeClassName () {
        const {isChecked} = this.state;
        let cl = '';
        if (isChecked) {
            cl = 'nck';
        } else {
            cl = 'ck';
        }
        this.setState({'className': cl,
            'isChecked': !isChecked}, () => {
            this.goOnFunction();
        });
    }

    goOnFunction () {
        const {isChecked} = this.state,
            {ck, id, setChecked} = this.props;
        if (isChecked && ck === false) {
            setChecked(id);
        } else
        if (!isChecked && ck === true) {
            setChecked(id);
        }
    }

    deleteToDo () {
        const {id} = this.props,
            {removeToDo} = this.props;
        removeToDo(id);

    }

    handleOnClick () {
        const {isClicked} = this.state;
        this.setState({'isClicked': !isClicked});
    }

    getHtmlTag (text) {
        const {id} = this.props,
            {isClicked} = this.state;
        if (isClicked) {
            return (
                <MyInput
                    id={id}
                    onBlur={() => {
                        const event = {'key': 'Enter'};
                        this.handleSaveModifiedTodo(event);
                    }}
                    onKeyPress={this.handleSaveModifiedTodo}
                    placeholder={text}
                    ref={this.inputRef}
                    type="text"
                />
            );
        }
        return (
            <span onClick={this.handleOnClick}>
                {text}
            </span>
        );
    }

    handleSaveModifiedTodo (event) {
        const {id, modifyText} = this.props;
        if (event.key === 'Enter') {
            const newText = this.inputRef.current.value.trim();
            if (newText.length) {
                this.setState({'text': newText}, () => {
                    this.handleOnClick(id);
                    modifyText(id, newText);
                });
            } else {
                this.handleOnClick(id);
            }
        }
    }

    render () {
        const {id, color} = this.props,
            {className, text} = this.state;
        return (
            <ListStyle>
                <CheckBox
                    id={id}
                    onChange={this.handleChangeClassName}
                    type="checkbox"
                />
                <MyTodoItem
                    cheked={className}
                    color={color}
                >
                    {this.getHtmlTag(text)}
                    {' '}
                </MyTodoItem>
                <DeleteTodo
                    id={id}
                    removeToDo={this.deleteToDo}
                />
            </ListStyle>
        );

    }

}
