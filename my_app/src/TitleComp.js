import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ListTitle = styled.h1`
    background-color: rgb(17, 105, 5);
    margin: auto;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 2px rgb(161, 245, 51) solid;
    color: rgb(161, 245, 51);
`,
    LittleTitle = styled(ListTitle)`
    width: 60%;
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
    color:  #5f6368;
    margin-left: 20px;
    font-size: 15px;
    text-align: left;
    border: 0px;
    margin-bottom: 0;
`,
    MyInput = styled.input`
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
    border : 0;
    width: 100px;
`;

export default class MyTitle extends React.Component {

    static propTypes = {
        'color': PropTypes.string,
        'id': PropTypes.string,
        'text': PropTypes.string
    }

    static defaultProps = {
        'color': '',
        'id':'',
        'text': 'enter title'
    }

    constructor (props) {
        super(props);
        const {id} = this.props, 
            text = window.localStorage.getItem('title'+id) ? 
            window.localStorage.getItem('title'+id)
            : props.text;
        this.state = {'clicked': false,
            text};
        this.titleRef = React.createRef();
    }

    getHtmlTag = () => {
        const {clicked, text} = this.state,
            {color} = this.props;
        if (clicked) {
            return (
                <MyInput
                    color={color}
                    onBlur={() => {
                        const event = {'key': 'Enter'};
                        this.handleEnter(event);
                    }}
                    onKeyPress={this.handleEnter}
                    placeholder={text}
                    ref={this.titleRef}
                />
            );
        }
        return (
            <span>
                {text}
            </span>
        );
    }

    handleClick = () => {
        const {clicked} = this.state;
        if (!clicked) {
            this.setState({'clicked': !clicked});
        }
    }

    handleEnter = (event) => {
        const {id} = this.props;
        if (event.key === 'Enter') {
            const newTitle = this.titleRef.current.value.trim();
            if (newTitle.length) {
                this.setState({'text': newTitle}, () => {
                    window.localStorage.setItem('title'+id, newTitle);
                });
            }
            this.setState({'clicked': false});
        }
    }

    render () {
        const {color} = this.props;
        return (
            <LittleTitle
                color={color}
                onClick={this.handleClick}
            >
                {this.getHtmlTag()}
            </LittleTitle>
        );
    }

}
