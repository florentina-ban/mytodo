import DeleteTodo from './Delete';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CheckBox = styled.input`
    cursor: pointer;
    border: none;
    width: 20px;
    height: 20px;   
    margin: 0px;
`,
    ListStyle = styled.li`
    list-style:none;
    margin:5px;
    text-align: center;
    display: flex;
    align-items: center;
`,
    MyInput = styled.input`
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
    border : 0;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #590303;
    font-size: 15px;
    }
`,
    MyTodoItem = styled.span`
    padding: 3px;
    margin: 3px;
    text-align: left;
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
    text-decoration: ${(props) => {
        if (!props.cheked) {
            return 'none';
        }
        return 'line-through';
    }
};
    display: inline-block;
    width: 60%;
    font-size: 15px;
    
    
`,
    WrapTag = styled.span`
    display: inline-block;
    width: 80%;
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
        this.state = {'isChecked': ck,
            'isClicked': false,
            'mouseOver': false,
            text};
        this.inputRef = React.createRef();
    }

    handleIsChecked = () => {
        const {isChecked} = this.state,
            {id, setChecked} = this.props;
        this.setState({'isChecked': !isChecked}, () => {
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
            {isClicked, isChecked} = this.state;
        if (isClicked) {
            return (
                <MyInput
                    color={color}
                    id={`input${id}`}
                    onBlur={() => {
                        this.handleSaveModifiedTodo({'key': 'Enter'}, text);
                    }}
                    onKeyPress={this.handleSaveModifiedTodo}
                    onMouseOver={this.handleFocusFunction}
                    placeholder={text}
                    ref={this.inputRef}
                    type="text"
                />
            );
        }
        return (
            <MyTodoItem
                cheked={isChecked}
                color={color}
            >
                <span onClick={this.handleOnClick}>
                    {text}
                </span>
            </MyTodoItem>
        );
    }

    handleFocusFunction = () => {
        const {id} = this.props;
        document.getElementById(`input${id}`).focus();
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

    getTheCheckbox = (checked) => {
        const {id} = this.props,
            htmlTag = <CheckBox
                checked={Boolean(checked)}
                id={id}
                onChange={this.handleIsChecked}
                type="checkbox" />;
        return htmlTag;
    }

    handleMouseOver = () => {
        const {mouseOver} = this.state;
        this.setState({'mouseOver': !mouseOver});
    }

    render () {
        const {id, color, ck} = this.props,
            {mouseOver, text} = this.state;
        return (
            <ListStyle>
                {this.getTheCheckbox(ck)}
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
