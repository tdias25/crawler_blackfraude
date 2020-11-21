module.exports = (() => {

    let filterMoney = (moneyString) => {

        if (typeof moneyString === 'number') {
            return moneyString;
        }

        return Number(moneyString.split('.').join('').split(',').join('.'));
    }

    return {
        filterMoney
    }

})();