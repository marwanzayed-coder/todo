export const CheckHeader = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization !== process.env.AUTH_HEADER) {
            res.status(401).send({ msg: "invalid Authorization." });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(401).json({ msg: err.message });
    }
};
//# sourceMappingURL=authHeader.js.map