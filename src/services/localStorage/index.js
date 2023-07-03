class LocalStorage {
  static getItem(key) {
    const storage = LocalStorage.getLocalStorageObject();

    return storage ? storage.getItem(key) : undefined;
  }

  static setItem(key, value) {
    const storage = LocalStorage.getLocalStorageObject();

    if (storage) {
      storage.setItem(key, value);
    }
  }

  static removeItem(key) {
    const storage = LocalStorage.getLocalStorageObject();

    if (storage) {
      storage.removeItem(key);
    }
  }

  static getLocalStorageObject() {
    const storage =
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage
        : undefined;

    if (!storage) {
      return storage;
    }

    try {
      const mod = 'test-local-storage';

      storage.setItem(mod, mod);

      if (storage.getItem(mod) !== mod) {
        return undefined;
      }

      storage.removeItem(mod);

      return storage;
    } catch (e) {
      return undefined;
    }
  }

  static isAvailable() {
    return Boolean(LocalStorage.getLocalStorageObject());
  }
}

export default LocalStorage;
