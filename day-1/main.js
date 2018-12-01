const calculateFrequency = (currentFrequency, change) => {
    if (change.charAt(0) === '+') {
        const changeValue = parseInt(change.slice(1));
        return currentFrequency + parseInt(changeValue);
    }
    if (change.charAt(0) === '-') {
        const changeValue = parseInt(change.slice(1));
        return currentFrequency - parseInt(changeValue);
    }
    return currentFrequency;
};

module.exports = {
    calculateFrequency
};
