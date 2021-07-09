const { User } = require('../models');

const userData = [{
        username: 'John',
        password: 'jkohn'

    },
    {
        username: 'Jake',
        password: 'jake'
    },
    {
        username: 'Joe',
        password: 'joe'
    }
];

const user = () => User.bulkCreate(userData);

module.exports = user;