function distance(lon1, lat1, lon2, lat2) {

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    var R = 6371; // Radius of the earth in km
    var dLat = toRadians(lat2-lat1);  // Javascript functions in radians
    var dLon = toRadians(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}


function compareLocation(location1, location2, options) {

    let maxDistance = options.maxDistance || 0;

    return distance(location1.longitude, location1.latitude, 
                    location2.longitude, location2.latitude) <= maxDistance;
}

function compareText(text1, text2, options = {}) {
    console.log("up in here", text1, text2, options);

    if (text1 === text2) {
        return true;
    } else if (options.caseInsensitive) {
        return text1.toUpperCase() === text2.toUpperCase();
    }
    return false;
}

function compareDateTime(dt1, dt2, options = {}) {

    let conversions = [['year', 365], ['day', 24], ['hour', 60], ['minute', 60]];

    function convertToSeconds(dt) {
        return conversions.reduce((prev, [k, v]) => {
            return ((dt[k] || 0) + prev) * v;
        }, 0)
    }
    console.log()
    let maxSecondsDifference = options.maxSecondsDifference || 0;
    return Math.abs(convertToSeconds(dt1) - convertToSeconds(dt2)) <= maxSecondsDifference;
}

function compareWord(word1, word2, options = {}) {
    return word1.every((value, index) => {
        if (options.caseInsensitive) return value.toUpperCase() === word2[index].toUpperCase();
        else return value === word2[index];
    });
}


function compareTextArray(arr1, arr2, options = {}) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((word, index) => compareWord(word, arr2[index], options));
}



const ValidationFunctions = {
    "text": compareText,
    "datetime": compareDateTime,
    "location": compareLocation,
    "textArray": compareTextArray
};


const validateFunction = function(validationObject, input) {
    let type = validationObject.validationType;
    let actualValue = validationObject.value;
    let options = validationObject.options;
    let compareFunction = ValidationFunctions[type];
    console.log("compare", type, actualValue, options, input);
    return compareFunction(actualValue, input, options);
    //console.log("compared", compared)
}


module.exports = {
    validateFunction
};


