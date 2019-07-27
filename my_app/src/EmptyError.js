import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const EmptyErr = function EmptyErr ({errMessage}) {

        return (
            <MyLable3>
                {errMessage}
            </MyLable3>
        );

    },
    MyLable3 = styled.p`
        background-color: rgb(161, 245, 51);
        color:rgb(217, 9, 9);
        margin-left:2px;
        margin-top:15px;
`;

EmptyErr.propTypes = {
    "errMessage": PropTypes.string
};
EmptyErr.defaultProps = {
    "errMessage": ""
};

export default EmptyErr;
