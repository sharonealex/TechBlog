const { User } = require('../models');

const userData = [{
        username: 'Cyrus Green',
        password: 'cg123456'

    },
    {
        username: 'Harvey Specter',
        password: '123456'
    },
    {
        username: 'Joe Tanin',
        password: 'jo123456'
    }
];

const user = () => User.bulkCreate(userData);

module.exports = user;