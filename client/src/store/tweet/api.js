export const fetchTweets = candidate =>
  fetch(`http://localhost:3000?q=${candidate}`).then(
    response => response.json()
  )
