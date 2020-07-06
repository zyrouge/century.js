declare module "century.js" {

    interface Timezone {
        country: string,
        timezone: string,
        gmt: string,
        offset: number
    }

    type format = (time: Time, form: string) => string;

    interface TimeOptions {
        timezone: string;
    }

    class Time {
        raw: Date;
        timezone: Timezone;

        constructor(time: number | string | Date, options: TimeOptions);
        time: Date;
        format(form: string): string;
    }

    interface utils {
        timezones: Array<Timezone>,
        format: format
    }

    const Century: {
        time: Time,
        utils: utils
    }

    export default Century;

}