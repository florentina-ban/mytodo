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

    getLista = function getLista (myString) {
        const lista = myString.split(';'),
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
export {getLista};

