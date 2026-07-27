const validate = (schema) => {
    return (req, res, next) => {
        const validation = schema.safeParse(req.body);

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