const timezones = require("./timezones.json");

function format() {}

class Time {
    constructor(time, options = {}) {
        if(
            time &&
            !(typeof time !== "number" || typeof time !== "string" || time instanceof Date)
        ) throw new Error("Time must be a number or string or instance of Date");

        if(typeof options !== "object") throw new Error("options must be an object");
        
        if(time instanceof Date) {
            this.raw = time;
        } else {
            try {
                this.raw = new Date(time);
            } catch(e) {
                throw new Error("Invalid Date was passed");
            }
        }

        if(options.timezone) {
            const timezone = timezones.find(tz => tz.timezone === options.timezone || tz.timezone === options.country) || null;
            if(!timezone) throw new TypeError("Invalid timezone was provided");
            this.timezone = timezone;
        } else {
            this.timezone = timezones.find(tz => tz.offset === 0);
        }
    }

    format(form) {
        return format(this.time, form);
    }

    get time() {
        return (new Date(this.raw.getTime() + (this.timezone.offset)));
    }
}

const Century = {
    time: Time,
    utils: {
        timezones,
        format
    }
}

module.exports = Century;