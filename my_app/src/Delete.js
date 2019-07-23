import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const BtnText = styled.text`
    color: black;
    font-weight: 800;
    padding: 3px;
    font-family: sans-serif
    font-style: italic;
    font-size:12px;
`,
    DeleteBtn = styled.span`
    background-color: rgb(132, 168, 2);
    border-radius: 40%;
    cursor: pointer;
`;

function Delete (props) {

    return (
        <DeleteBtn onClick={props.removeToDo.bind(this, props.id)}>
            <BtnText> Delete ? </BtnText>
        </DeleteBtn>
    );

}

Delete.propTypes = {
    "id": PropTypes.string
};

export default Delete;
