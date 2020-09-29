export const updateObject = (updatedObject, updatedValues) => {
    return {
        ...updatedObject,
        ...updatedValues
    }
}