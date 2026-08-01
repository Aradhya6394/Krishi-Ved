import { crops } from "./crop.data.js";
const recommendCrops = async ({
    nitrogen,
    phosphorus,
    potassium,
    temperature,
    humidity,
    ph,
    rainfall
}) => {

    
    const input = {
        nitrogen,
        phosphorus,
        potassium,
        temperature,
        humidity,
        ph,
        rainfall
    };

    const recommendations = crops.map((crop) => {

        let score = 0;
        let matchedConditions = 0;

        for (const key in crop.ideal) {

            const [min, max] = crop.ideal[key];

            if (input[key] >= min && input[key] <= max) {
                score += 100 / 7;
                matchedConditions++;
            }
        }

        score = Math.round(score);

        let suitability;

        if (score >= 80) {
            suitability = "High";
        } else if (score >= 50) {
            suitability = "Medium";
        } else {
            suitability = "Low";
        }




        const issues = [];

        for (const key in crop.ideal) {
            const [min, max] = crop.ideal[key];

            if (input[key] < min) {
                issues.push(`${key} is below the preferred range`);
            } else if (input[key] > max) {
                issues.push(`${key} is above the preferred range`);
            }
        }

        let reason;

        if (issues.length === 0) {
            reason = "All major soil and weather conditions are within the preferred range.";
        } else {
            reason = issues.join(", ") + ".";
        }




        return {
        crop: crop.crop,
        score,
        suitability,
        matchedConditions,
        reason
        };
    });

    recommendations.sort((a, b) => b.score - a.score);

    return recommendations.slice(0, 3);
};

export { recommendCrops };