import EmptyError from './EmptyError';
import PropTypes from 'prop-types';
import React from 'react';
import generateId from './utils';
import styled from 'styled-components';


const AddComp = styled.span`
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
`,
    BtnAdd = styled.input`
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
    margin:2px;
    border: 0;
    border-bottom: 1px grey solid;
`,
    BtnAddButton = styled.input`
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
    border: 0;
`;

export default class AddComponent extends React.Component {

    static propTypes = {
        'addToDo': PropTypes.func,
        'allToDos': PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.string
        ])),
        'color': PropTypes.string
    }

    static defaultProps = {
        'addToDo': () => {
            const aNumber = 0;
            return aNumber;
        },
        'allToDos': [],
        'color': ''
    }

    constructor (props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {'emptyErr': ''};
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.handleAddToDoCb();
            event.preventDefault();
        }
    }

    handleAddToDoCb = () => {
        const todoText = this.myRef.current.value.trim(),
            {allToDos, addToDo} = this.props,
            zero = 0;

        if (todoText.length === zero) {
            this.setState({'emptyErr': 'fill the gap and then press Enter'});
        } else {
            document.getElementById('todo_id').value = '';
            const idG = generateId(allToDos),
                stuff = {
                    'done': false,
                    'id': idG,
                    'text': todoText
                };
            addToDo(stuff);
        }
    }

    render () {
        const {emptyErr} = this.state,
            {color} = this.props;
        return (
            <AddComp
                color={color}
                onKeyPress={this.handleKey}
            >
                <BtnAdd
                    color={color}
                    id="todo_id"
                    onChange={() => {
                        this.setState({'emptyErr': ''});
                    }}
                    ref={this.myRef}
                    type="text"
                />
                <BtnAddButton
                    color={color}
                    id="add_button_id"
                    onClick={this.handleAddToDoCb}
                    type="button"
                    value="+"
                />
                <EmptyError
                    color={color}
                    errMessage={emptyErr}
                />
            </AddComp>
        );
    }
}
