import SpotifyWebAPI from 'spotify-web-api-js';

const sp = new SpotifyWebAPI();

export const initSpotify = async (accessToken) => {
  sp.setAccessToken(accessToken);
}

export const getProfileInfo = async () => {
  const profileInfo = await sp.getMe();

  return profileInfo
}

export const getTopArtists = async (timeframe) => {
  const topArtists = await sp.getMyTopArtists({ limit: 50, 'time_range': timeframe })
  return topArtists.items
}

export const getTopTracks = async (timeframe) => {
  const topTracks = await sp.getMyTopTracks({ limit: 50, 'time_range': timeframe })
  return topTracks.items
}

export const getTopGenres = (artists) => {
  // Create array
  let allGenres = []

  for (let i = 0; i < artists.length; i++) {
    allGenres.push(...artists[i].genres)
  }

  // Counter
  let genreCount = {}
  for (let i = 0; i < allGenres.length; i++) {
    if (genreCount[allGenres[i]]) {
      genreCount[allGenres[i]] += 1
    } else {
      genreCount[allGenres[i]] = 1
    }
  }

  return genreCount
}

export const getAudioFeatures = async (tracks) => {
  // Params
  const params = ["danceability", "energy"]//, "loudness", "speechiness", "acousticness", "instrumentalness", "liveness", "valence", "tempo", "key", "mode", "duration_ms", "time_signature"]

  // Get Audio Features
  let trackIds = []
  for (let i = 0; i < tracks.length; i++) {
    trackIds.push(tracks[i].id)
  }

  const rawAudioFeatures = await sp.getAudioFeaturesForTracks(trackIds)
  const audioFeatures = rawAudioFeatures.audio_features

  let avgAudioFeatures = {}
  for (let i = 0; i < audioFeatures.length; i++) {
    for (let j = 0; j < params.length; j++) {
      let value = audioFeatures[i][params[j]]
      let key = params[j]

      // Only if param exists!
      if (value) {

        // If key exists in average object
        if (avgAudioFeatures[key]) {

          // Push to array
          avgAudioFeatures[key].push(value)
        } else {

          // Setup array
          avgAudioFeatures[key] = [value]
        }
      }
    }
  }

  // Calculate average
  for (let feature in avgAudioFeatures) {
    avgAudioFeatures[feature] = avgAudioFeatures[feature].reduce(function (p, c, i, a) { return p + (c / a.length) }, 0);
  }
  return avgAudioFeatures

}

