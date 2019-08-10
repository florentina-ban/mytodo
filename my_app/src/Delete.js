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
    background-color: rgb(132, 168, 2);
    border-radius: 40%;
    cursor: pointer;
`,

    DeleteTodo = function DeleteTodo ({id, removeToDo}) {

        return (
            <DeleteBtn onClick={removeToDo.bind(id)}>
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
