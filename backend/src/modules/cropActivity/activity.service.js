import { getCropActivityConfig } from "./activity.config.js";

const getDaysSinceSowing = (sowingDate) => {
    const sowing = new Date(sowingDate);
    const today = new Date();

    const difference =
        today.getTime() - sowing.getTime();

    return Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );
};


const getCurrentGrowthStage = (
    cropConfig,
    daysSinceSowing
) => {

    for (const stage of cropConfig.stages) {

        if (
            daysSinceSowing >= stage.minDays &&
            daysSinceSowing <= stage.maxDays
        ) {
            return stage;
        }
    }

    return null;
};


const getActivityStatus = (
    activity,
    daysSinceSowing
) => {

    if (
        daysSinceSowing >= activity.startDay &&
        daysSinceSowing <= activity.endDay
    ) {
        return "Due";
    }

    if (
        daysSinceSowing < activity.startDay
    ) {
        return "Upcoming";
    }

    return "Past";
};


const generateCropActivityCalendar = ({
    crop,
    sowingDate,
    location,
    area
}) => {

    if (
        !crop ||
        !sowingDate ||
        !location
    ) {
        throw new Error(
            "Crop, sowing date and location are required"
        );
    }


    const cropConfig =
        getCropActivityConfig(crop);


    if (!cropConfig) {
        throw new Error(
            `Crop "${crop}" is not supported yet`
        );
    }


    const daysSinceSowing =
        getDaysSinceSowing(sowingDate);


    if (daysSinceSowing < 0) {
        throw new Error(
            "Sowing date cannot be in the future"
        );
    }


    const currentGrowthStage =
        getCurrentGrowthStage(
            cropConfig,
            daysSinceSowing
        );


    const activities =
        cropConfig.activities.map(
            (activity) => {

                const status =
                    getActivityStatus(
                        activity,
                        daysSinceSowing
                    );

                return {
                    name: activity.name,

                    type: activity.type,

                    status,

                    startDay:
                        activity.startDay,

                    endDay:
                        activity.endDay,

                    description:
                        activity.description
                };
            }
        );


    const dueActivities =
        activities.filter(
            (activity) =>
                activity.status === "Due"
        );


    const upcomingActivities =
        activities.filter(
            (activity) =>
                activity.status === "Upcoming"
        );
    const pastActivities = activities.filter(
        (activity) => activity.status === "Past"
    );
    const summary = {
        totalActivities: activities.length,
        past: pastActivities.length,
        due: dueActivities.length,
        upcoming: upcomingActivities.length
    };
    const nextActivity =
    dueActivities.length > 0
        ? dueActivities[0]
        : upcomingActivities.length > 0
            ? upcomingActivities[0]
            : null;


    return {
        crop,
        location,
        area,
        sowingDate,

        daysSinceSowing,

        currentGrowthStage,

        activities,

        summary,

        nextActivity,

        pastActivities,

        dueActivities,

        upcomingActivities
    };
};


export {
    generateCropActivityCalendar
};