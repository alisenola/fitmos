const classFragment = `
beginsDate
capacity
currency
endsDate
goal
interval
language
level
location {
  city
  street
  place
}
image
owner {
  id
  avatar
  nickname
}
price
recurring
signed
title
opentokSessionId
archiveUrl
description
comments {
  edges {
    node {
      id
      text
      owner {
        avatar
        nickname
      }
    }
  }
}`;

export default classFragment;
