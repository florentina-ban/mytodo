import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const MyLable3 = styled.p`
    background-color: rgb(161, 245, 51);
    color:rgb(217, 9, 9);
    margin-left:2px;
    margin-top:15px;
`;

function EmptyErr (props) {

    return (
        <MyLable3>
            {" "}
            {props.errMessage}
            {" "}
        </MyLable3>
    );

}

EmptyErr.propTypes = {
    "errMessage": PropTypes.string
};

export default EmptyErr;
