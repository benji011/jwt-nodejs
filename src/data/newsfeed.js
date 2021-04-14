exports.newsfeed = [
  {
    username: 'testuser_1',
    news: {
      title: "I'm hungry ..",
      category: 'status',
      likes: 12,
      comments: [
        {
          id: 2,
          username: 'testuser_2',
          comment: 'Haha, get some food!',
        },
        {
          id: 1,
          username: 'testuser_1',
          comment: 'Maybe I will!',
        },
      ],
    },
  },
  {
    username: 'testuser_2',
    news: {
      title: 'Who wants pizza?',
      category: 'status',
      likes: 84,
      comments: [
        {
          id: 3,
          username: 'testuser_3',
          comment: 'Oh yeah!!',
        },
        {
          id: 1,
          username: 'testuser_1',
          comment: 'I was just thinking about eating something!',
        },
      ],
    },
  },
]
