import {Cache} from "../src/cache";

describe('chache get/set functionality', () => {
    it('should set data at least for one query', () => {
        const key = "key";
        const value = "value";
        let cache = new Cache();

        cache.set(key, value);

        let cached_value = cache.get(key);
        expect(cached_value).toBe(value);
    });
    
    it('should return null when there is no value by key', () => {
        const key = "key";
        let cache = new Cache();

        let cached_value = cache.get(key);

        expect(cached_value).toBe(null);
    });

    it('should return null after setted number of queries', () => {
        const key = "key";
        const value = "value"
        const number_of_queries = 2;
        let cache = new Cache();

        cache.set(key, value, number_of_queries);
        
        cache.get(key);
        cache.get(key);
        
        const cached_value = cache.get(key);
        expect(cached_value).toBe(null);
    });
})