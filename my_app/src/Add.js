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
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'blue') {
            return 'rgb(18, 222, 113)';
        }
        return 'rgb(202, 212, 13)';
    }
};
`,
    BtnAdd = styled.input`
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
    cursor: pointer;
    margin:2px;
    border: 0;
    border-bottom: 1px grey solid;
`,
    BtnAddButton = styled.input`
    background-color:  ${(props) => {
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'blue') {
            return 'rgb(18, 222, 113)';
        }
        return 'rgb(202, 212, 13)';
    }
};
    cursor: pointer;
    margin:2px;
`,
    MyLable = styled.span`
        background-color: rgb(17, 105, 5);
        color:rgb(161, 245, 51);
        padding: 4px;
        text-align: left;
        margin:2px;
`,
    MyLable2 = styled(MyLable)`
        background-color: ${(props) => {
        if (props.error === 'errorClass') {
            return 'rgb(17, 105, 5)';
        }
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'blue') {
            return 'rgb(18, 222, 113)';
        }
        return 'rgb(202, 212, 13)';
    }
};
        color: ${(props) => {
        if (props.error === 'errorClass') {
            return 'rgb(161, 245, 51)';
        }
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'blue') {
            return 'rgb(18, 222, 113)';
        }
        return 'rgb(202, 212, 13)';
    }
};
        margin: 2px;
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
        this.state = {'labelErrClass': 'errorClass'};
        this.myRef = React.createRef();
        this.handleKey = this.handleKey.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.handleAddToDoCb = this.handleAddToDoCb.bind(this);
    }

    handleKey (event) {

        if (event.key === 'Enter') {
            this.handleAddToDoCb();
            event.preventDefault();
        }

    }

    handleValue () {
        let errclass = '';
        const zero = 0;
        if (this.myRef.current.value.length === zero) {
            errclass = 'errorClass';
        } else {
            errclass = 'noErrorClass';
        }
        this.setState({'labelErrClass': errclass});
        if (this.myRef.current.value.length) {
            this.setState({'emptyErr': ''});
        }
    }

    handleAddToDoCb () {
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
            this.setState({'labelErrClass': 'errorClass'});
        }
    }

    render () {
        const {labelErrClass, emptyErr} = this.state,
            {color} = this.props;
        return (
            <AddComp
                color={color}
                onKeyPress={this.handleKey}
            >
                <BtnAdd
                    color={color}
                    id="todo_id"
                    onChange={this.handleValue}
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
                <MyLable2
                    color={color}
                    error={labelErrClass}
                >
                    {'not ready yet !'}
                </MyLable2>
                <EmptyError errMessage={emptyErr} />
            </AddComp>
        );
    }
}
