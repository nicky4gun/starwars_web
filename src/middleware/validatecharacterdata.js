const roles = [
    'Jedi',
    'Sith',
    'Bounty Hunter',
    'Smuggler',
    'Droid',
    'Rebel',
    'Imperial'
];

function validateCharacterData(req, res, next) {
    const { name, role, planet } = req.body || {};

    if (typeof name !== 'string' || name.trim() === '' || name.trim().length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (!roles.includes(role)) {
        return res.status(400).json({ error: 'Role must be valid e.g. Jedi' });
    }

    if (typeof planet !== 'string' || planet.trim() === '') {
        return res.status(400).json({ error: 'Planet is required & must be a string' });
    }

    next();
}

module.exports = { validateCharacterData, roles };