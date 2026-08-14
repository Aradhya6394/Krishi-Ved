import {
    generateCropActivityCalendar
} from "./activity.service.js";


const getCropActivityCalendar = (
    req,
    res
) => {

    try {

        const {
            crop,
            sowingDate,
            location,
            area
        } = req.body;


        const data =
            generateCropActivityCalendar({
                crop,
                sowingDate,
                location,
                area
            });


        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


export {
    getCropActivityCalendar
};