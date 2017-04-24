const Store = require('../api/models/store.model');
const User = require('../api/models/user.model');
const Boardgame = require('../api/models/boardgame.model');
const Order = require('../api/models/order.model');

const clearStore = () => {
    return Store.remove();
};

const clearUser = () => {
    return User.remove();
};

const clearOrder = () => {
    return Order.remove();
};

const clearAllData = () => {
    return Promise.all([Boardgame.remove(), Store.remove(), User.remove(), Order.remove()]);
};

const createStore = () => {
    const store = new Store({
        name: 'Store name',
        password: 'storepassword',
        email: 'store@store.com',
        address: 'store address, finland'
    });
    return Store.create(store);
};

const createUser = () => {
    const user = new User();
    user.facebook.id = '1248490201873498';
    user.facebook.token = 'EAAC4sT93gqYBAO6pEKuMGHeHdYoBV18uV2sr2khtPQYRmTMnaQsHSt2gwh5HiKqmWemhbSUzzmlU2WTjYnaBeEaSor1SGBvZBnetxAbNc9ArnpWp0fvSANtbvfcvqmMc3bdgNlZBa9sBVdA1Cfi7P7uWZBA3LUKh9px3un5vAZDZD';
    user.firstName = 'Hai',
        user.lastName = 'Phan';
    user.email = 'test@test.com';
    return User.create(user);
};

const createBoardgame = () => {
    return new Promise(function(resolve, reject) {
        createStore().then((savedStore) => {
            const boardgame = new Boardgame({
                'photoUrl': '1492762998005-photo.jpg',
                'title': 'Boardgame title',
                'description': 'Boardgame description',
                'category': 'Card Game',
                'player': '2-6',
                'time': '2+ hours',
                'ages': '1-5',
                'price': 20,
                'store': savedStore._id
            });
            Boardgame.create(boardgame).then((savedBoardgame) => {
                resolve({
                    boardgame: savedBoardgame,
                    store: savedStore
                });
            });
        });
    });
};

const createUserAndBoardgame = () => {
    return new Promise(function(resolve, reject) {
        Promise.all([createBoardgame(), createUser()]).then((values) => {
            resolve({
                boardgame: values[0].boardgame,
                store: values[0].store,
                user: values[1]
            });
        });
    });
};

const createOrder = () => {
    return new Promise(function(resolve, reject) {
        createUserAndBoardgame().then((response) => {
            const order = new Order({
                item: response.boardgame._id,
                buyer: response.user._id,
                seller: response.boardgame.store,
                shippingAddress: 'shippingAddress',
                transactionId: 'stripeTransactionId'
            });
            Order.create(order).then((savedOrder) => {
                resolve({
                    order: savedOrder,
                    boardgame: response.boardgame,
                    store: response.store,
                    user: response.user
                });
            });
        });
    });
};

module.exports = {
    clearStore,
    clearUser,
    clearOrder,
    clearAllData,
    createStore,
    createUser,
    createBoardgame,
    createUserAndBoardgame,
    createOrder
};
