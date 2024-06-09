// fetchHelpers.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// get user id and token from async storage
export const getUserIdAndToken = async () => {
    const token = await AsyncStorage.getItem('token');
    let userId = await AsyncStorage.getItem('uid');
    if (userId && userId.startsWith('"') && userId.endsWith('"')) {
        userId = userId.substring(1, userId.length - 1);
    }
    return { token, userId };
};
//fetch user data by id
export const fetchUserDataById = async (userId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};


// fetch user data
export const fetchUserData = async (token, userId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

// fetch subscription data om te kijken of de user een abonnement heeft
export const fetchSubscriptionData = async (token, userId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/check-subscription/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

// fetch alle farm data
export const fetchFarmData = async () => {
    const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/farms', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    });
    return await response.json();
};

// fetch farm data by id
export const fetchFarmDataById = async (farmId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    });
    return await response.json();
};

// fetch farm by owner id
export const fetchFarmDataByOwner = async (token, userId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/owner/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

// alle packages van een farm ophalen
export const fetchPackagesData = async (farmId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}/packages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

// alle members van een farm ophalen
export const fetchMembersData = async (farmId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}/members`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

// alle reviews van een farm ophalen
export const fetchReviewsData = async (farmId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/farms/${farmId}/reviews`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

// fetch package data by id
export const fetchPackageDataById = async (packageId, userId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/packages/${packageId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    });
    const data = await response.json();
    const userSubscription = data.data.package.subscribedUsers.find(sub => sub.user === userId);
    return { packageData: data.data.package, subscriptionDetails: userSubscription };
};

// fetch alle activity data
export const fetchActivityData = async () => {
    const response = await fetch('https://lab3-backend-w1yl.onrender.com/api/activities', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    });
    return await response.json();
};

// fetch activity data by id
export const fetchActivityDataById = async (id) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/activities/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    });
    return await response.json();
};

// enroll in an activity
export const enrollInActivity = async (userId, activityId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userId}/enroll/${activityId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, activityId }),
    });
    return await response.json();
};

// unenroll from an activity
export const unenrollFromActivity = async (userId, activityId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/users/${userId}/unenroll/${activityId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, activityId }),
    });
    return await response.json();
};

// subscribe to a package
export const subscribeToPackage = async (userId, packageId) => {
    const response = await fetch(`https://lab3-backend-w1yl.onrender.com/api/subscription/subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, packageId }),
    });
    return await response.json();
};