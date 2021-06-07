const testObject = { name: 'Bruce Wayne', age: 36, location: 'Gotham' };
// use this object to test your functions

// Complete the following underscore functions.
// Reference http://underscorejs.org/ for examples.

function keys(obj) {
    // Retrieve all the names of the object's properties.
    // Return the keys as strings in an array.
    // Based on http://underscorejs.org/#keys
    return Object.keys(obj);
}

keys(testObject);


function values(obj) {
    // Return all of the values of the object's own properties.
    // Ignore functions
    // http://underscorejs.org/#values
    return Object.values(obj);
}

values(testObject);




function mapObject(obj, cb) {
    // Like map for arrays, but for objects. 
    //Transform the value of each property in turn by passing it to the callback function.
    // http://underscorejs.org/#mapObject
    for (let keys in obj) {
        if (keys === 'age') {
            obj[keys] = cb(obj[keys]);
        }
    }

    return obj;
}


mapObject(testObject, (keys) => {
    return keys + 1;
});


function pairs(obj) {
    // Convert an object into a list of [key, value] pairs.
    // http://underscorejs.org/#pairs
    return Object.entries(obj);
}
pairs(testObject);



/* STRETCH PROBLEMS */

function invert(obj) {
    // Returns a copy of the object where the keys have become the values and the values the keys.
    // Assume that all of the object's values will be unique and string serializable.
    // http://underscorejs.org/#invert
    let newObj = {};
    for (let index in obj) {
        if (newObj[obj[index]]) {
            newObj[obj[index]] = index;
        } else {
            newObj[obj[index]] = index;
        }
    }

    return newObj;
}

invert(testObject)




defaultProps = { location: 'Hyderabad' };

function defaults(obj, defaultProps) {
    // Fill in undefined properties that match properties on the `defaultProps` parameter object.
    // Return `obj`.
    // http://underscorejs.org/#defaults
    for (let key in obj) {
        for (let keys in defaultProps) {
            if (key === keys) {
                obj[key] = defaultProps[keys];
            }
        }
    }
    return obj;
}

defaults(testObject, defaultProps);


