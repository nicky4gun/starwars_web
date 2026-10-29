
function validateId(req, res, next) {
    const idString = req.params.id;
    const id = Number(idString);

    if (!/^[1-9]\d*$/.test(idString) || !Number.isSafeInteger(id)) {
        return res.status(400).json({ error: 'Invalid id. Must be a positive whole number.' });
    }

    req.characterId = id;
    next();
}

module.exports = { validateId };
