class customDate {
    constructor(timestamp){
        this.date = new Date(+timestamp)
    }

    getDateInfo(){
        return {
            date: this.date.toDateString(),
            time: this.date.toLocaleString()
        };
    }
}

module.exports = customDate;
