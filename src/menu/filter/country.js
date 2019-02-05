const { countryMessages } = require('../messages');
const { countryFilter } = require('../../filters');
const data = require('../../data/mock-data.json');
const { getData, reentryMenu } = require('../operations');

const countryMenu = (buildMenu) => {
    const option = buildMenu(countryMessages);

    if (option === '0') return require('../index').filterMenu(buildMenu);

    getData(countryFilter, data, option);

    const reentryOption = reentryMenu('Filtro', 'País');

    if (reentryOption !== 's') require('../index').filterMenu(buildMenu);

    return countryMenu(buildMenu);
}

module.exports = countryMenu;
