import {Cache} from "../src/cache";

describe('cache class', () => {
    it('should save data at least for one query', () => {
        const key = "key";
        const value = "value";
        let cache = new Cache();

        cache.save(key, value);

        let cached_value = cache.get(key);
        expect(cached_value).toBe(value);
    });
    
    it('should return null when there is no value by key', () => {
        const key = "key";
        let cache = new Cache();

        let cached_value = cache.get(key);

        expect(cached_value).toBe(null);
    });
})