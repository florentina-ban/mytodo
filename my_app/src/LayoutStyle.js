import styled from 'styled-components';

const AllComp = styled.form`
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
    width: 300px;
    min-height: 300px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
`,
    ColorButton = styled.input`
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
    cursor: pointer;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-left: 10px;
    border: ${(props) => {
        if (props.color === props.backgroundColor) {
            return '1px black solid';
        }
        return 'none';
    }
};
`,
    ColorComp = styled.form`
    display: flex;
`,
    HeaderComp = styled.form`
    display: flex;
    justify-content: space-between;
    width: 298px;
`,
    LayoutAddBtn = styled(ColorButton)`
    margin: 10px;
    margin-left: 20px;
    font-weight: bold;
    border: none;
`,
    ListComp = styled.form`
    font: normal 12px sans-serif;
`,
    ListTitle = styled.h1`
    background-color: #f1f3f4;
    margin: auto;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
    border: 0;
    color: #5f6368;
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
    padding: 0;
`;
export {AllComp};
export {LittleTitle};
export {ListComp};
export {ListTitle};
export {ColorComp};
export {HeaderComp};
export {ColorButton};
export {LayoutAddBtn};
