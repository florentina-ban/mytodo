import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const BtnText = styled.span`
    color: ${(props) => {
        if (props.mouseOver) {
            return 'black';
        }
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
    font-weight: 800;
    padding: 3px;
    font-family: sans-serif
    font-style: italic;
    font-size:13px;
`,
    DeleteBtn = styled.span`
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
    border-radius: 40%;
    cursor: pointer;
`,

    DeleteTodo = function DeleteTodo ({id, removeToDo, mouseOver, color}) {
        if (mouseOver) {
            return (
                <DeleteBtn
                    color={color}
                    mouseOver={mouseOver}
                    onClick={removeToDo.bind(id)}
                >
                    <BtnText
                        color={color}
                        mouseOver={mouseOver}
                    >
                        {'X'}
                    </BtnText>
                </DeleteBtn>
            );
        }
        return (
            <DeleteBtn
                color={color}
                mouseOver={mouseOver}
                onClick={removeToDo.bind(id)}
            >
                <BtnText
                    color={color}
                    mouseOver={mouseOver}
                >
                    {'X'}
                </BtnText>
            </DeleteBtn>
        );

    };

export default DeleteTodo;

DeleteTodo.defaultProps = {
    'color': '',
    'id': '',
    'mouseOver': '',
    'removeToDo': ''
};

DeleteTodo.propTypes = {
    'color': PropTypes.string,
    'id': PropTypes.string,
    'mouseOver': PropTypes.func,
    'removeToDo': PropTypes.func
};
