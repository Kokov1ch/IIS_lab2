export function getSortFunction(column, order, innerFunction) {
    if (order === "ascending") {
        return (a, b) => {
            let value = a[column] - b[column];
            if (value === 0) {
                return innerFunction(a, b);
            } else {
                return value;
            }
        };
    } else if (order === "descending") {
        return (a, b) => {
            let value = b[column] - a[column];
            if (value === 0) {
                return innerFunction(a, b);
            } else {
                return value;
            }
        };
    } else {
        return null;
    }
}
