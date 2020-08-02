import SpotifyWebAPI from 'spotify-web-api-js';

let sp = new SpotifyWebAPI();

export const initSpotify = async (accessToken) => {
  sp.setAccessToken(accessToken);
}

export const getProfileInfo = async () => {
  const profileInfo = await spotifyObject.getMe();
  setSpotifyProfile(profileInfo)

  return profileInfo
}

export const getTopArtists = async () => {
  const rawTopArtists = await spotifyObject.getMyTopArtists({ limit: 50, 'time_range': 'medium_term' })
  const topArtists = rawTopArtists.items

  const artists = []
  const genres = []

  for (artist in topArtists) {
    artists.push({
      name: topArtists[artist].name,
      id: topArtists[artist].id
    })

    genres.push(topArtists[artist].genres)
  }

  return {
    artists,
    genres
  }
}

export const getTopGenres = (genres) => {
  genreCount = {}
  for (artist in genres) {
    for (genre in genres[artist]) {
      if (genreCount[genres[artist][genre]]) {
        genreCount[genres[artist][genre]] += 1
      } else {
        genreCount[genres[artist][genre]] = 1
      }
    }
  }

  return genreCount
}

export const getTopTracks = async () => {
  let topTracks = await spotifyObject.getMyTopTracks({ limit: 50 })

  topTracks = topTracks.items.map((track) => {
    return {
      name: track.name,
      id: track.id
    }
  })

  return topTracks
}
