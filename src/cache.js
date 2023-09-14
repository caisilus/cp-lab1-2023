class Cache{
    constructor () {
        this.data = new Map()
    }
    save(key, value) {
        this.data[key] = value
    }

    get(key) {
        const value = this.data[key]
        
        return value === undefined ? null : value
    }
}
export {Cache}