class Cache{
    constructor () {
        this.data = new Map()
        this.statisticsList = []
    }

    set(key, value, numberOfQueries=1) {
        this.data.set(key, {
            value: value,
            numberOfQueries: numberOfQueries
        });
        this.statisticsList.push(this.set_statistics_line(key, value, numberOfQueries))
    }

    get(key) {
        const valueObject = this.data.get(key)

        if (valueObject === undefined) { return null }
        
        if (valueObject.numberOfQueries === 0) {
            this.data.delete(key)
            return null;
        }

        valueObject.numberOfQueries -= 1;

        this.statisticsList.push(this.get_statistics_line(key, valueObject.numberOfQueries))
        return valueObject.value
    }

    get_statistics_line(key, numberOfQueries) {
        return `get ${key} ${numberOfQueries}` 
    }

    set_statistics_line(key, value, numberOfQueries) {
        return `set ${key}, ${value}, ${numberOfQueries}`
    }

    statistics() {
        return this.statisticsList;
    }
}
export {Cache}