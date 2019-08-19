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
    background-color:${(props) => {
        if (props.color === 'green') {
            return 'rgb(163, 255, 43)';
        }
        if (props.color === 'yellow') {
            return 'rgb(202, 212, 13)';
        }
        return 'rgb(18, 222, 113)';
    }
};
    color:  rgb(17, 105, 5);
    margin-left: 20px;
    font-size: 15px;
    text-align: left;
    border: 0px;
    margin-bottom: 0;
`,
    MyInput = styled.input`
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
    border : 0;
    width: 100px;
`;

export default class MyTitle extends React.Component {

    static propTypes = {
        'color': PropTypes.string,
        'text': PropTypes.string
    }

    static defaultProps = {
        'color': '',
        'text': 'enter title'
    }

    constructor (props) {
        super(props);
        this.state = {'clicked': false,
            'text': props.text};
        this.getHtmlTag = this.getHtmlTag.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.titleRef = React.createRef();
    }

    getHtmlTag () {
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

    handleClick () {
        const {clicked} = this.state;
        if (!clicked) {
            this.setState({'clicked': !clicked});
        }

    }

    handleEnter (event) {
        if (event.key === 'Enter') {
            const newTitle = this.titleRef.current.value.trim();
            if (newTitle.length) {
                this.setState({'text': newTitle});
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
