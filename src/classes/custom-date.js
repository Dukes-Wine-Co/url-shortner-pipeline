class customDate {
    constructor(timestamp){
        this.date = new Date(+timestamp);
    }

    parseDateInfo(){
        const [dayOfWeek, ...dateStringArr] = this.date.toDateString().split(' ');
        const [month, day, year] = dateStringArr;
        const dateString = dateStringArr.join(' ');

        return {
            month,
            day,
            year,
            dayOfWeek,
            dateString
        };
    }

    formatTime(timestring){
        const regexStr = /:|\s/;
        const [
            initalHour,
            minutes,
            seconds,
            AMOrPM
        ] = timestring.split(regexStr);

        let hour;

        if (AMOrPM === 'AM'){
            hour = initalHour !== '12' ? initalHour : '0';
        } else {
            hour = initalHour === '12' ? initalHour : `${parseInt(initalHour) + 12}`;
        }

        return {
            hour,
            minutes,
            seconds
        };
    }

    parseTimeInfo(){
        const timeString = this.date.toLocaleTimeString();

        return {
            timeString,
            ...this.formatTime(timeString)
        };
    }

    getDateInfo(){
        return {
            ...this.parseTimeInfo(),
            ...this.parseDateInfo()
        };
    }
}

module.exports = customDate;
