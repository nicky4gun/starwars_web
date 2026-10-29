
function validateId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid id. Must be a whole number.' })
    }
    req.characterId = id;
    next();
}
module.exports = { validateId };
