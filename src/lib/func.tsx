export function formatNumberWithCommas(number:number) {
    // Convert number to string and split it into integer and decimal parts
    let parts = number.toString().split(".");
    
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Join the integer and decimal parts with a dot and return the result
    return parts.join(".");
}