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
    display: inline-block;
    width: 70%;
`,
    WrapTag = styled.span`
    display: inline-block;
    width: 70%;
`;

export default class Todo extends React.Component {

    static propTypes = {
        'ck': PropTypes.bool,
        'color': PropTypes.string,
        'id': PropTypes.string,
        'modifyText': PropTypes.func,
        'removeToDo': PropTypes.func,
        'setChecked': PropTypes.func,
        'text': PropTypes.string
    }

    static defaultProps = {
        'ck': true,
        'color': '',
        'id': '',
        'modifyText': () => null,
        'removeToDo': () => null,
        'setChecked': () => null,
        'text': ''
    }

    constructor (props) {
        super(props);
        const {ck, text} = props;
        this.state = {'className': this.getChecked(ck),
            'isChecked': Boolean(ck),
            'isClicked': false,
            'mouseOver': false,
            text};
        this.inputRef = React.createRef();
    }

    getChecked = (ck) => {
        if (ck) {
            return 'ck';
        }
        return 'nck';
    }

    handleChangeClassName = () => {
        const {isChecked} = this.state,
            {id, setChecked} = this.props,
            className = this.getChecked(isChecked);
        this.setState({className,
            'isChecked': !isChecked}, () => {
            setChecked(id);
        });
    }

    deleteToDo = () => {
        const {id, removeToDo} = this.props;
        removeToDo(id);

    }

    handleOnClick = () => {
        const {isClicked} = this.state;
        this.setState({'isClicked': !isClicked});
    }

    getHtmlTag = (text) => {
        const {id, color} = this.props,
            {isClicked, className} = this.state;
        if (isClicked) {
            return (
                <MyInput
                    color={color}
                    id={id}
                    onBlur={() => {
                        this.handleSaveModifiedTodo({'key': 'Enter'}, text);
                    }}
                    onKeyPress={this.handleSaveModifiedTodo}
                    placeholder={text}
                    ref={this.inputRef}
                    type="text"
                />
            );
        }
        return (
            <MyTodoItem
                cheked={className}
                color={color}
            >
                <span onClick={this.handleOnClick}>
                    {text}
                </span>
            </MyTodoItem>
        );
    }

    handleSaveModifiedTodo = (event, text) => {
        const {id, modifyText} = this.props;
        if (event.key === 'Enter') {
            const newText = this.inputRef.current.value.trim();
            if (newText.length) {
                this.setState({'text': newText}, () => {
                    this.handleOnClick(id);
                    modifyText(id, newText);
                });
            } else {
                this.setState({'isClicked': false,
                    text});
            }
        }
    }

    handleMouseOver = () => {
        const {mouseOver} = this.state;
        this.setState({'mouseOver': !mouseOver});
    }

    render () {
        const {id, color} = this.props,
            {mouseOver, text} = this.state;
        return (
            <ListStyle>
                <CheckBox
                    id={id}
                    onChange={this.handleChangeClassName}
                    type="checkbox"
                />
                <WrapTag
                    onMouseOut={this.handleMouseOver}
                    onMouseOver={this.handleMouseOver}
                >
                    {this.getHtmlTag(text)}
                    {' '}
                    <DeleteTodo
                        color={color}
                        id={id}
                        mouseOver={mouseOver}
                        removeToDo={this.deleteToDo}
                    />
                </WrapTag>
            </ListStyle>
        );

    }

}
