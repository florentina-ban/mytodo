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
    MyTodoItem = styled.span`
    padding: 3px;
    margin: 3px;
    text-align: left;
    background-color: ${(props) => {
        if (props.cheked === 'nck') {
            return 'rgb(163, 255, 43)';
        }
        return 'rgb(242, 203, 48)';
    }
};
    text-decoration: ${(props) => {
        if (props.cheked === 'nck') {
            return 'none';
        }
        return 'line-through';
    }
};
`,
    MyInput = styled.input`
    background-color: rgb(163, 255, 43);
    border : 0;
    width: 100px;
    
`;

export default class Todo extends React.Component {

    static propTypes = {
        'ck': PropTypes.bool,
        'done': PropTypes.bool,
        'id': PropTypes.string,
        'removeToDo': PropTypes.func,
        'setChecked': PropTypes.func,
        'modifyText': PropTypes.func,
        'text': PropTypes.string
    }

    static defaultProps = {
        'ck': true,
        'done': true,
        'id': '',
        'removeToDo': () => null,
        'setChecked': () => null,
        'modifyText': () => null,
        'text': ''
    }

    constructor (props) {

        super(props);
        if (props.ck === false) {
            this.state = {'className': 'nck',
                'isChecked': false,
                'htmlTag': 'span',
                'isClicked': false,
                'text': this.props.text};
        } else {
            this.state = {'className': 'ck',
                'isChecked': true,
                'htmlTag': 'span',
                'isClicked': false,
                'text': this.props.text};
        }
        this.handleChangeClassName = this.handleChangeClassName.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getHtmlTag = this.getHtmlTag.bind(this);   
        this.saveModifiedTodo = this.saveModifiedTodo.bind(this);
        
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

    handleOnClick (id) {
        const {isClicked} = this.state;
        this.setState({'isClicked':!isClicked});
    }
    getHtmlTag (text) {
        const {isClicked} = this.state;
        if (isClicked)
            return (
                <MyInput type='text' id={this.props.id} placeholder={text} onKeyPress={this.saveModifiedTodo} ref={this.inputRef}>
                </MyInput>
            );
        return (
            <span onClick={this.handleOnClick}>{text}</span>
        );
    }

    saveModifiedTodo (event) {
        if (event.key === "Enter") {
                let newText = this.inputRef.current.value.trim();
                if (newText.length>0)
                this.setState({'text':newText},()=>{
                    this.handleOnClick(this.props.id); 
                    this.props.modifyText(this.props.id, newText);
                });
                else{
                    this.handleOnClick(this.props.id);
                }
            }
    }

    render () {
        const {done, id} = this.props,
            {className, text} = this.state;
        return (
            <ListStyle>
                <CheckBox
                    id={id}
                    onChange={this.handleChangeClassName}
                    type="checkbox"
                />
                <MyTodoItem cheked={className}>
                    {this.getHtmlTag(text)};
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
