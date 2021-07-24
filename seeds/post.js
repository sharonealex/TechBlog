const { Post } = require('../models');

const postData = [{
        title: 'Clean Code Studio Software Resources (JavaScript)',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: 1

    },
    {
        title: 'Reactive Programming 🌫️ - Demystified using RxJS',
        content: 'I will be explaining the core Reactive Programming concepts, relating them to RxJS and how works they work in practice. Hopefully, by the end of the read, youll have a truer understanding of RxJS ',
        user_id: 2
    },
    {
        title: 'Four Rules for Big O',
        content: 'When calculating for the Big O of algorithms we’re supposed to assume the worst case. This is our first rule. ',
        user_id: 3
    }
];

const post = () => Post.bulkCreate(postData);

module.exports = post;