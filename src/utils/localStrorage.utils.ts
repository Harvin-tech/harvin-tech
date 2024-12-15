/**
 * Saves the given state to local storage.
 */
export function saveLocalStorage(key: string, state: object | string) {
  if (typeof Storage === 'undefined') {
    return false;
  }

  try {
    if (typeof state === 'object') {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      localStorage.setItem(key, state);
    }

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Deletes the state stored in local storage with the given key.
 */
export function deleteLocalStorage(key: string) {
  if (typeof Storage === 'undefined') {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Saves the given state to local storage with an expiration date.
 */
export function saveLocalStorageExpire(
  key: string,
  data: object | string,
  expirationMin: number
) {
  if (typeof Storage === 'undefined') {
    return false;
  }
  try {
    const expirationMS = expirationMin * 60 * 1000;
    const record = {
      value: typeof data === 'object' ? JSON.stringify(data) : data,
      timestamp: new Date().getTime() + expirationMS,
    };
    localStorage.setItem(key, JSON.stringify(record));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieves a value from local storage that has an expiration date associated with it.
 * If the item is expired or doesn't exist, it will be removed from local storage.
 */
export function getLocalStorageExpire(key: string): object | string | null {
  if (typeof Storage === 'undefined') {
    return null;
  }
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    const record = JSON.parse(item);
    if (!record || !record.timestamp) {
      return null;
    }

    if (new Date().getTime() >= record.timestamp) {
      localStorage.removeItem(key);
      return null;
    }

    try {
      return JSON.parse(record.value);
    } catch (error) {
      return record.value;
    }
  } catch (e) {
    // Return null if there was an error during retrieval or parsing
    return null;
  }
}

/**
 * Retrieves a string value from local storage.
 * Returns null if the item doesn't exist or if there is an error.
 */
export const getLocalStorageString = (key: string): string | null => {
  if (typeof Storage === 'undefined') {
    return null;
  }
  try {
    const data = localStorage.getItem(key);

    if (data === null) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
};

/**
 * Retrieves a value from local storage. If the item doesn't exist,
 */
export function getLocalStorage(key: string): object | string | null {
  if (typeof Storage === 'undefined') {
    return null;
  }
  try {
    const data = localStorage.getItem(key);

    if (data === null) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  } catch (err) {
    return null;
  }
}
