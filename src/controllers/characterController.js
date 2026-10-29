const characterService = require('../services/characterService');

async function getCharacters(req, res) {
    const characters = await characterService.getCharacters();
    res.status(200).json(characters);
}

async function getCharacterById(req, res) {
    const character = await characterService.getCharacterById(req.characterId);

    if (!character) {
        return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json(character);
}

async function createCharacter(req, res) {
    const newCharacter = await characterService.createCharacter(req.body);
    res.status(201).json({ message: 'Character created succesfully', newCharacter });
}

async function updateCharacter(req, res) {
    const updatedCharacter = await characterService.updateCharacter(req.characterId, req.body);

    if (!updatedCharacter) {
        return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json({ message: 'Updated character succesfully', updatedCharacter });
}

async function deleteCharacter (req, res) {
    const deletedCharacter = await characterService.deleteCharacter(req.characterId);

    if (!deletedCharacter) {
        return res.status(404).json({ message: 'Character not found' });
    }

    res.status(204).send();
}



module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};