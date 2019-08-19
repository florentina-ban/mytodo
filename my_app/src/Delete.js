import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const BtnText = styled.span`
    color: ${(props) => {
        if (props.mouseOver) {
            return 'black';
        }
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'yellow') {
            return 'rgb(202, 212, 13)';
        }
        return 'rgb(18, 222, 113)';
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
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'yellow') {
            return 'rgb(202, 212, 13)';
        }
        return 'rgb(18, 222, 113)';
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
