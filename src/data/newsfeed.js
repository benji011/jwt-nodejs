exports.newsfeed = [
  {
    id: 0,
    avatar: 1,
    username: 'testuser_1',
    likes: 24,
    date_posted: '2021-04-14',
    news: {
      title: "I'm hungry ..",
      category: 'status',
      likes: 12,
      comments: [
        {
          id: 2,
          avatar: 2,
          username: 'testuser_2',
          likes: 2,
          comment: 'Haha, get some food!',
          date_posted: '2021-04-15',
        },
        {
          id: 1,
          avatar: 1,
          username: 'testuser_1',
          likes: 0,
          comment: 'Maybe I will!',
          date_posted: '2021-04-14',
        },
      ],
    },
  },
  {
    id: 1,
    avatar: 2,
    username: 'testuser_2',
    likes: 42,
    date_posted: '2021-04-14',
    news: {
      title: 'Who wants pizza?',
      category: 'status',
      likes: 84,
      comments: [
        {
          id: 3,
          avatar: 3,
          username: 'testuser_3',
          likes: 12,
          comment: 'Oh yeah!!',
          date_posted: '2021-04-14',
        },
        {
          id: 1,
          avatar: 1,
          username: 'testuser_1',
          likes: 1,
          comment: 'I was just thinking about eating something!',
          date_posted: '2021-04-14',
        },
      ],
    },
  },
]
