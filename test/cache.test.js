import {Cache} from "../src/cache";

describe('basic chache get/set functionality', () => {
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

    it('should let you override value by key', () => {
        const key = "key";
        const value1 = "value1";
        const value2 = 123;
        let cache = new Cache();

        cache.set(key, value1);
        cache.set(key, value2);

        expect(cache.get(key)).toBe(value2);
    });

    it('should let you set multiple key value pairs', () => {
        const key1 = "key1";
        const key2 = "key2";
        const value1 = "value1";
        const value2 = 123;
        let cache = new Cache();

        cache.set(key1, value1);
        cache.set(key2, value2);

        expect(cache.get(key1)).toBe(value1);
        expect(cache.get(key2)).toBe(value2);
    });
});

describe("number of queries cache feature", () => {
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

    it('should use number of queries = 1 as default', () => {
        const key = "key";
        const value = "value";
        let cache = new Cache();

        cache.set(key, value);

        cache.get(key);
        expect(cache.get(key)).toBe(null);
    });

    it ('should be able to reset value and number of queries after expiration', () => {
        const key = "key";
        const value = "value";
        let cache = new Cache();

        cache.set(key, value, 2);
        cache.get(key);
        cache.get(key);
        cache.get(key);

        cache.set(key, value);
        expect(cache.get(key)).toBe(value);
        expect(cache.get(key)).toBe(null);
    });
});

describe('cache statistics', () => {
    it('should return empty list for no queries', () => {
        let cache = new Cache();


        const statistics = cache.statistics();
        expect(statistics).toEqual([]);
    });

    it('should return queries list for one query', () => {
        const key = "key";
        const value = "value";
        const number_of_queries = 3;
        let cache = new Cache();

        cache.set(key, value, number_of_queries) ;
        cache.get(key);

        const statistics = cache.statistics();
        expect(statistics).toEqual([`set ${key}, ${value}, ${number_of_queries}`, 
                                    `get ${key} ${number_of_queries - 1}`]);
    });

    it('should not add invalid queries to statistics', () => {
        const key1 = "key";
        const key2 = "invalid key";
        const value = "value";
        let cache = new Cache();

        cache.set(key1, value);
        cache.get(key1);
        cache.get(key2);
        const statistics = cache.statistics();
        expect(statistics).toEqual([`set ${key1}, ${value}, 1`,
                                    `get ${key1} 0`]);
    })
});