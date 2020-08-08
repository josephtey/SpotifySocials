import axios from 'axios'

const db = axios.create({
    baseURL: 'https://8ty11v60zg.execute-api.ap-southeast-2.amazonaws.com/dev/'
});

export const initialiseUser = async (userData) => {
    const response = await db.post('/inituser', userData)

    return response.data
};

export const checkIfUserExists = async (spotifyId) => {
    const response = await db.post('/userexists', { spotifyId })

    return response.data.result
}

export const getUser = async (spotifyId) => {
    const response = await db.post('/user', { spotifyId })
    let user = response.data

    // Data Processing
    // let topGenres = JSON.parse(response.data.topGenres)
    // let arr = []
    // for (let key in topGenres) {
    //     arr.push([key, topGenres[key]])
    // }

    // arr.sort(function compare(kv1, kv2) {
    //     return kv1[1] - kv2[1]
    // })

    // let sortedGenres = []
    // for (let i in arr) {
    //     sortedGenres.push(arr[i][0])
    // }

    // Set processed data
    // user.topGenres = sortedGenres
    return user
};

export const getFriends = async (currentUser) => {
    const response = await db.post('/getfriends', { currentUser })

    return response.data
};

export const getFriendRequests = async (otherUser) => {
    const response = await db.post('/getfriendrequests', { otherUser })
    return response.data
};

export const acceptFriendRequest = async (currentUser, otherUser) => {
    const response = await db.post('/acceptfriend', { currentUser, otherUser })
    return response.data
};

export const rejectFriendRequest = async (currentUser, otherUser) => {
    const response = await db.post('/rejectfriend', { currentUser, otherUser })
    return response.data
};

export const addFriend = async (currentUser, otherUser) => {
    const response = await db.post('/addFriend', { currentUser, otherUser })
    return response.data
};

export const searchUsers = async (username) => {
    const response = await db.post('/searchusers', { username })

    return response.data
};


// Searching Spotify Directory more info / images / etc
export const getArtist = async (artistId) => {
    const artistInfo = await spotifyObject.getArtist(artistId);

    return artistInfo
}

export const getTrack = async (trackId) => {
    const trackInfo = await spotifyObject.getTrack(trackId);

    return trackInfo
}


// COMPARE
export const getMatches = async (currentUser) => {
    const response = await db.post('/getmatches', {
        currentUser
    })

    return response.data
}

export const getUserMatches = async (currentUser, comparedUser) => {
    const response = await db.post('/getusermatches', {
        currentUser, comparedUser
    })

    return response.data
}

const calculateSimilarity = (currentUser, comparedUser) => {
    return Math.floor(Math.random() * 101)
}

export const compareUsers = async (currentUser, comparedUser) => {

    let percentage = calculateSimilarity(currentUser, comparedUser)

    await db.post('/newmatch', {
        currentUser: currentUser.username,
        comparedUser: comparedUser.username,
        compatibilityPercentage: percentage,
        dateMatched: new Date().getTime()
    })

    return percentage

};