// Getter function to retrieve data from localStorage
export const getLocalStorageItem = (key) => {
  try {
    const serializedItem = localStorage.getItem(key)
    if (serializedItem === null) {
      return undefined // Return undefined if item doesn't exist
    }
    return JSON.parse(serializedItem) // Parse JSON data
  } catch (err) {
    console.error("Error getting data from localStorage:", err)
    return undefined
  }
}

// Setter function to save data to localStorage
export const setLocalStorageItem = (key, value) => {
  try {
    const serializedItem = JSON.stringify(value)
    localStorage.setItem(key, serializedItem)
  } catch (err) {
    console.error("Error saving data to localStorage:", err)
  }
}

// Function to clear all data from localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.clear()
  } catch (err) {
    console.error("Error clearing localStorage:", err)
  }
}
