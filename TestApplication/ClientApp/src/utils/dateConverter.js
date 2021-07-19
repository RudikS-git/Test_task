export const convertStrDateToDate = (date) => {
    if(date == null) {
        return null;
    }
    
    const parts = date.split(".");
    
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

export const toISOStringTracking = (date) => {
    
    if(date == null) {
        return null;
    }
    
    date.setHours(10);
    return date.toISOString();
}