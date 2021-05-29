import axios from 'axios'

const db = axios.create({
    baseURL: 'https://8ty11v60zg.execute-api.ap-southeast-2.amazonaws.com/dev/'
});

// Users
export const initialiseUser = async (userData) => {
    console.log(userData)
    const response = await db.post('/initialiseUser', userData)

    return response.data
};

export const checkIfUserExists = async (spotifyId) => {
    const response = await db.post('/userExists', { spotifyId })

    return response.data.result
}

export const getUser = async (spotifyId) => {
    const response = await db.post('/getUser', { spotifyId })
    let user = response.data

    return user
};

export const searchUsers = async (username) => {
    const response = await db.post('/searchUsers', { username })

    return response.data
};

// Relationships

export const getFriends = async (currentUser) => {
    const response = await db.post('/getFriends', { currentUser })

    return response.data
};

export const getFriendRequests = async (otherUser) => {
    const response = await db.post('/getFriendRequests', { otherUser })
    return response.data
};

export const acceptFriendRequest = async (currentUser, otherUser) => {
    const response = await db.post('/acceptFriendRequest', { currentUser, otherUser })
    return response.data
};

export const rejectFriendRequest = async (currentUser, otherUser) => {
    const response = await db.post('/rejectFriendRequest', { currentUser, otherUser })
    return response.data
};

export const addFriend = async (currentUser, otherUser) => {
    const response = await db.post('/addFrend', { currentUser, otherUser })
    return response.data
};

// COMPARE
export const getAllUserMatches = async (currentUser) => {
    const response = await db.post('/getAllMatches', {
        currentUser
    })

    return response.data
}

export const getSpecificUserMatches = async (currentUser, otherUser) => {
    const response = await db.post('/getSpecificMatches', {
        currentUser, otherUser
    })
    return response.data
}

export const newMatch = async (currentUser, otherUser) => {

    const response = await db.post('/newMatch', {
        currentUser, otherUser
    })

    return response.data

};