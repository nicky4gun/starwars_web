const characterService = require('../services/characterService');
const roles =
    ['Jedi', 'Sith', 'Bounty Hunter', 'Smuggler', 'Droid', 'Rebel', 'Imperial'];

async function getCharacters(req, res) {
    const characters = await characterService.getCharacters();
    res.status(200).json(characters);
}

async function getCharacterById(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid id. Must be a whole number.' })
    }

    const character = await characterService.getCharacterById(id);

    if (!character) {
        return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json(character);
}

async function createCharacter(req, res) {
    const validation = validateCharacterData(req.body);

    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    const { name, role, planet } = req.body;

    const character = {
        name: name.trim(),
        role: role.trim(),
        planet: planet.trim()
    };

    const newCharacter = await characterService.createCharacter(character);
    res.status(201).json({ message: 'Character created succesfully', newCharacter });
}

async function updateCharacter(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid id. Must be a whole number.' })
    }

    const validation = validateCharacterData(req.body);

    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    const updatedCharacter = await characterService.updateCharacter(id, req.body);

    if (!updatedCharacter) {
        return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json({ message: 'Updated character succesfully', updatedCharacter });
}

async function deleteCharacter (req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid id. Must be a whole number.' })
    }

    const deletedCharacter = await characterService.deleteCharacter(id);

    if (!deletedCharacter) {
        return res.status(404).json({ message: 'Character not found' });
    }

    res.status(204).json({ message: 'Character deleted successfully' });
}

function validateCharacterData(character) {
    const { name, role, planet } = character;

    if (typeof name !== 'string' || name.trim() === '' || name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
    }

    if (!Array.isArray(roles) || !roles.includes(role)) {
        return { valid: false, message: 'Role must be valid e.g. Jedi' };
    }
    
    if (typeof planet !== 'string' || planet.trim() === '') {
        return { valid: false, message: 'Planet is required & must be a string' };
    }

    return { valid: true };
}

module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};