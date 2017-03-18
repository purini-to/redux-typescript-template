export default {
  Token: {
    default: {
      id: 'abcdefg',
      ttl: 123,
      userId: 1,
      created: new Date()
    }
  },
  Account: {
    default: {
      id: 1,
      username: 'johndoe',
      firstname: 'john',
      lastname: 'doe',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  Response: {
    '500': new Error('Request failed with status code 500')
  }
};
