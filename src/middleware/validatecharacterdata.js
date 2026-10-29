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
    const normalizedName = typeof name === 'string' ? name.trim() : name;
    const normalizedRole = typeof role === 'string' ? role.trim() : role;
    const normalizedPlanet = typeof planet === 'string' ? planet.trim() : planet;

    if (typeof normalizedName !== 'string' || normalizedName.length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (!roles.includes(normalizedRole)) {
        return res.status(400).json({ error: 'Role must be valid e.g. Jedi' });
    }

    if (typeof normalizedPlanet !== 'string' || normalizedPlanet === '') {
        return res.status(400).json({ error: 'Planet is required & must be a string' });
    }

    req.body = {
        name: normalizedName,
        role: normalizedRole,
        planet: normalizedPlanet
    };

    next();
}

module.exports = { validateCharacterData, roles };