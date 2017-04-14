const userFragment = `
id
nickname
firstName
lastName
gender
role
avatar
specialities
aboutMe
email
age
goals
score
myClasses
favorites
watched
location {
  lat
  lon
}
rate {
  edges {
    node {
      rating
    }
  }
}`;

export default userFragment;
