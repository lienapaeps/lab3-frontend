// utils.js
import * as Location from 'expo-location';

export const checkStatus = (openingHours, currentTime = new Date()) => {
    const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const currentDayIndex = currentTime.getDay();
    const currentDay = dayNames[currentDayIndex];

    const todayOpeningHours = openingHours.find((hours) => hours.day === currentDay);

    if (!todayOpeningHours || !todayOpeningHours.openinghour || !todayOpeningHours.closinghour) {
        return false;
    }

    const [openingHour, openingMinute] = todayOpeningHours.openinghour.split(':').map(Number);
    const [closingHour, closingMinute] = todayOpeningHours.closinghour.split(':').map(Number);

    if (isNaN(openingHour) || isNaN(openingMinute) || isNaN(closingHour) || isNaN(closingMinute)) {
        return false;
    }

    const openingTime = new Date(currentTime);
    openingTime.setHours(openingHour, openingMinute, 0, 0);

    const closingTime = new Date(currentTime);
    closingTime.setHours(closingHour, closingMinute, 0, 0);

    return currentTime >= openingTime && currentTime <= closingTime;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

export const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
    }
    return await Location.getCurrentPositionAsync({});
};
