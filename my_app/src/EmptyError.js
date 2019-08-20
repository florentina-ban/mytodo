import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const EmptyErr = function EmptyErr ({errMessage, color}) {

        return (
            <MyLable3 color={color}>
                {errMessage}
            </MyLable3>
        );

    },
    MyLable3 = styled.span`
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
        color:rgb(217, 9, 9);
        margin-left:2px;
        margin-top:15px;
        font-weight: bold;
`;

EmptyErr.propTypes = {
    'color': PropTypes.string,
    'errMessage': PropTypes.string
};
EmptyErr.defaultProps = {
    'color': 'color6',
    'errMessage': ''
};

export default EmptyErr;
