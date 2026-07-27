const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const validation = schema.safeParse(req[property]);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: validation.error.issues[0].message,
            });
        }

        next();
    };
};

export default validate;