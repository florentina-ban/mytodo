import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const BtnText = styled.span`
    color: black;
    font-weight: 800;
    padding: 3px;
    font-family: sans-serif
    font-style: italic;
    font-size:13px;
`,
    DeleteBtn = styled.span`
    background-color: ${(props) => {
        if (props.mouseOver){
            return 'rgb(247, 15, 15)';
        }
        return 'rgb(132, 168, 2)';
    }
};
    border-radius: 40%;
    cursor: pointer;
`,

    DeleteTodo = function DeleteTodo ({id, removeToDo, mouseOver}) {
        if (mouseOver){
            return(
            <DeleteBtn onClick={removeToDo.bind(id)} mouseOver={mouseOver}>
                <BtnText>
                    {'X'}
                </BtnText>
            </DeleteBtn>
            );
        }
        return (
            <DeleteBtn onClick={removeToDo.bind(id)} mouseOver={mouseOver}>
                <BtnText>
                    {'X'}
                </BtnText>
            </DeleteBtn>
        );

    };

export default DeleteTodo;

DeleteTodo.defaultProps = {
    'id': '',
    'removeToDo': ''
};

DeleteTodo.propTypes = {
    'id': PropTypes.string,
    'removeToDo': PropTypes.func
};
