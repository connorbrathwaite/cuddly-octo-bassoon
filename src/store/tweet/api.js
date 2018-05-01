/* TODO...
window.fetch(url, {
    headers: {
      Authorization: ?
    }
  })
*/
export const fetchTweets = candidate => {
  const url = `https://api.twitter.com/1.1/search/tweets.json?q=${candidate}`
  return Promise.resolve({
    response: candidate === 'trump' ? mockTrump : mockHilary
  })
}

const mockTrump = {
  statuses: [
    {
      created_at: 'Sun Feb 25 18:11:01 +0000 2018',
      id: 967824267948773377,
      id_str: '967824267948773377',
      text: 'Trump text',
      truncated: true,

      user: {
        id: 11348282,
        id_str: '11348282',
        name: 'NASA',
        screen_name: 'NASA',
        description:
          'Explore the universe and discover our home planet with @NASA. We usually post in EST (UTC-5)',
        url: 'https://t.co/TcEE6NS8nD',
        entities: {
          url: {
            urls: [
              {
                url: 'https://t.co/TcEE6NS8nD',
                expanded_url: 'http://www.nasa.gov',
                display_url: 'nasa.gov',
                indices: [0, 23]
              }
            ]
          },
          description: {
            urls: []
          }
        },
        profile_image_url:
          'http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_banner_url:
          'https://pbs.twimg.com/profile_banners/11348282/1518798395'
      }
    },
    {
      created_at: 'Sun Feb 26 18:11:01 +0000 2018',
      id: 967824267948773378,
      id_str: '967824267948773377',
      text: 'Trump text 2',
      truncated: true,

      user: {
        id: 11348282,
        id_str: '11348282',
        name: 'TRUMP 2',
        screen_name: 'TRUMP 2',
        description:
          'Explore the universe and discover our home planet with @NASA. We usually post in EST (UTC-5)',
        url: 'https://t.co/TcEE6NS8nD',
        entities: {
          url: {
            urls: [
              {
                url: 'https://t.co/TcEE6NS8nD',
                expanded_url: 'http://www.nasa.gov',
                display_url: 'nasa.gov',
                indices: [0, 23]
              }
            ]
          },
          description: {
            urls: []
          }
        },
        profile_image_url:
          'http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_banner_url:
          'https://pbs.twimg.com/profile_banners/11348282/1518798395'
      }
    }
  ]
}

const mockHilary = {
  statuses: [
    {
      created_at: 'Sun Feb 25 18:11:01 +0000 2018',
      id: 9678242679487733627,
      id_str: '967824267948773377',
      text: 'Hilary text one',
      truncated: true,
      user: {
        id: 11348282,
        id_str: '11348282',
        name: 'HILARY',
        screen_name: 'HILARY',
        description:
          'Explore the universe and discover our home planet with @NASA. We usually post in EST (UTC-5)',
        url: 'https://t.co/TcEE6NS8nD',
        profile_image_url:
          'http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_banner_url:
          'https://pbs.twimg.com/profile_banners/11348282/1518798395'
      }
    },
    {
      created_at: 'Sun Feb 30 18:11:01 +0000 2018',
      id: 967824267948773378111,
      id_str: '967824267948773377',
      text: 'Hilary text two',
      truncated: true,
      user: {
        id: 11348282,
        id_str: '11348282',
        name: 'HILARY',
        screen_name: 'HILARY',
        description:
          'Explore the universe and discover our home planet with @NASA. We usually post in EST (UTC-5)',
        url: 'https://t.co/TcEE6NS8nD',
        entities: {
          url: {
            urls: [
              {
                url: 'https://t.co/TcEE6NS8nD',
                expanded_url: 'http://www.nasa.gov',
                display_url: 'nasa.gov',
                indices: [0, 23]
              }
            ]
          },
          description: {
            urls: []
          }
        },
        profile_image_url:
          'http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg',
        profile_banner_url:
          'https://pbs.twimg.com/profile_banners/11348282/1518798395'
      }
    }
  ]
}
