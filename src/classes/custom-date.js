class customDate {
    constructor(timestamp){
        Object.assign(this, new Date(+timestamp));
    }

    getDateInfo(){
        return {
            date: this.toDateString(),
            time: this.toLocaleString()
        };
    }
}

module.exports = customDate;
