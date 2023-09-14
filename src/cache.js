class Cache{
    constructor () {
        this.data = new Map()
    }
    set(key, value, number_of_queries=1) {
        this.data.set(key, {
            value: value,
            number_of_queries: number_of_queries
        });
    }

    get(key) {
        const valueObject = this.data.get(key)
        if (valueObject === undefined) {
            return null
        }

        if (valueObject.number_of_queries === 0) {
            this.data.delete(key)
            return null;
        }

        valueObject.number_of_queries -= 1;

        return valueObject.value
    }
}
export {Cache}