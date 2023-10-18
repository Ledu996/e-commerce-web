const initialCurrency = 117.5; // dinars 

// Leave it for later, consumes much time right now

// Do not use it now, google a litle bit
export function findAppropriateCurrency (price) {
    const usersState = JSON.parse(localStorage.getItem('user')).state;

    const state = listOfCurrencies.find(item => item.state === usersState);
    console.log('This ', price/ state.currency)
    return price / state.currency;
}

export const listOfCurrencies = [
    {
        state: 'Europa',
        currency: 117.5,
        exchangeRate: function () { return initialCurrency / this.currency},
        symbol: 'eur',
    },
    {
        state: 'United-States',
        currency: 1.17,
        exchangeRate: function () { return initialCurrency / this.currency},
        symbol: '$',
    }, 
    {
        state: 'United-Kingdom',
        currency: 150.5,
        exchangeRate: function () { return initialCurrency / this.currency},
        symbol: 'Pound'
    }
]




