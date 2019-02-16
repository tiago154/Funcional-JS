const readLineSync = require('readline-sync');
const data = require('../data/mock-data.json');
const R = require('ramda');

const printMessage = m => console.log(m);

const getInput = (type) => {
    if (type === 'Reentry')
        return readLineSync.question('', { limit: ['s', 'n'], limitMessage: 'Digite [S/N]' });
    if (type === 'Prompt')
        return readLineSync.prompt({ prompt: '=> ' });
    if (type === 'Sort')
        return readLineSync.question('', { limit: ['c', 'd'], limitMessage: 'Digite [C/D]' });
    return '';
};
const buildMenu = (messages, type = 'Prompt') => {
    console.clear();
    messages.map(printMessage);
    return getInput(type);
};

const isEmptyOrIsNill = (isEmpty, isNil) => values => (isEmpty(values) || isNil(values));
const isInvalidValues = isEmptyOrIsNill(R.isEmpty, R.isNil);

const printValues = values => isInvalidValues(values) ?
    console.log('\nDados não localizados\n') :
    console.log(`\n${JSON.stringify(values, null, 4)}\n`);

const reentryMenu = (operation, menuName) => {
    console.log('Deseja Realizar uma nova pesquisa?\n');
    console.log('\'S\' - SIM\n\'N\' - NÃO\n');
    console.log(`Operação: ${operation}`);
    console.log(`Menu: ${menuName}\n`);
    const optionUser = getInput('Reentry');
    console.clear();
    return optionUser;
};

const getFilter = functionOrigin => (fieldName, inputUser) => printValues(functionOrigin(data, fieldName, inputUser));
const getGroup = functionOrigin => (fieldName, desc) => printValues(functionOrigin(data, fieldName, desc));

module.exports = {
    buildMenu,
    getFilter,
    getGroup,
    getInput,
    printValues,
    reentryMenu
};
