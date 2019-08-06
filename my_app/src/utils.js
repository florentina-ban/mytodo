const generateId = function generateId (todoList) {
    const increm = 1,
        someNumber = 100;
    let found = false,
        id = "";
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
};
export default generateId;
