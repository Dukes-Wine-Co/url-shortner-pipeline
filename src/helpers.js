const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const clearEmptyObjFields = obj => JSON.parse(JSON.stringify(obj));

module.exports = {
    capitalizeFirstLetter,
    clearEmptyObjFields
}
