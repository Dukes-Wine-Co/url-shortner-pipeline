class customDate {
    constructor(timestamp){
        this.date = new Date(+timestamp)
    }

    parseDateInfo(){
        let [dayOfWeek, ...date] = this.date.toDateString();
        return {
            dayOfWeek,
            date: date.join(' ')
        }
    }

    getDateInfo(){
        const { dayOfWeek, date } = this.parseDateInfo();

        return {
            dayOfWeek,
            date,
            time: this.date.toLocaleTimeString()
        };
    }
}

module.exports = customDate;
