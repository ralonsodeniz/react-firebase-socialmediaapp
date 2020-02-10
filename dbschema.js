// in this file we display the structure of our database
// it has no implications in our code but as a blueprint for us to know how we want the db to looks like
const db = {
  users: [
    {
      userId: "sdgs3523sdfs5w3",
      email: "user@email.com",
      handle: "user",
      createdAt: "2020-02-06T10:49:17.479Z",
      imageUrl: "image/sdgsdgasgsa/dsgasdgsdg",
      bio: "hello, my name is user, nice to meet you",
      website: "https://user.com",
      location: "London, UK"
    }
  ],
  screams: [
    {
      userHandle: "user handle",
      body: "this is the scream body",
      createdAt: "2020-02-05T13:30:47.225Z",
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "fdg8698agdaf097",
      body: "nice one mate!",
      createdAt: "2020-02-06T10:49:17.479Z"
    }
  ],
  notifications: [
    {
      recipient: "user",
      sender: "jhon",
      read: "true | false",
      screamId: "asfsardgasgdsah",
      type: "like | comment",
      createdAt: "2020-02-06T10:49:17.479Z"
    }
  ]
};

// redux data
const userDetails = {
  credentials: {
    userId: "sdgs3523sdfs5w3",
    email: "user@email.com",
    handle: "user",
    createdAt: "2020-02-06T10:49:17.479Z",
    imageUrl: "image/sdgsdgasgsa/dsgasdgsdg",
    bio: "hello, my name is user, nice to meet you",
    website: "https://user.com",
    location: "London, UK"
  },
  likes: [
    {
      userHandle: "user",
      screamId: "fdg8698agdaf097"
    }
  ]
};
