const generateId = function generateId (todoList) {
        const increm = 1,
            someNumber = 100;
        let found = false,
            id = '';
        while (!found) {
            found = true;
            const myNumber = parseInt(Math.random() * someNumber, 10);
            id = `todo${myNumber}`;
            for (let iter = 0; iter < todoList.length; iter += increm) {
                if (todoList[iter].id === id) {
                    found = false;
                }
            }
        }
        return id;
    },

    generateLayoutId = function generateLayoutId (idList) {
        const increm = 1,
            someNumber = 100;
        let found = false,
            id = '';
        while (!found) {
            found = true;
            const myNumber = parseInt(Math.random() * someNumber, 10);
            id = myNumber.toString();
            for (let iter = 0; iter < idList.length; iter += increm) {
                if (idList[iter] === id) {
                    found = false;
                }
            }
        }
        return id;
    },

    getLayoutIds = function getLayoutIds (myString) {
        const lista = myString
            ? myString.split(',')
            : ['1'];
        return lista;
    },

    getLayoutString = function getLayoutString (layoutIds) {
        let myString = '';
        layoutIds.forEach((id) => {
            if (myString) {
                myString = `${myString},${id}`;
            } else {
                myString += id;
            }
        });
        return myString;
    },

    getLista = function getLista (myString) {
        const lista = myString
                ? myString.split(';')
                : [],
            listaRemake = [];
        lista.forEach((element) => {
            const elements = element.split(','),
                mytodo = {'done': elements[2] === 'true',
                    'id': elements[0],
                    'text': elements[1]};
            listaRemake.push(mytodo);
        });
        return listaRemake;
    },

    getString = function getString (lista) {
        let myString = '';
        lista.forEach((element) => {
            if (myString.length) {
                myString += ';';
            }
            myString = `${myString + element.id},${element.text}`;
            myString += `,${element.done.toString()}`;
        });
        return myString;
    };

export default generateId;
export {getString};
export {getLayoutIds};
export {getLista};
export {getLayoutString};
export {generateLayoutId};

