const characters = [
    { id: 1, name: 'Luke Skywalker',role: 'Jedi',planet: 'Tatooine' },
    { id: 2, name: 'Darth Vader', role: 'Sith', planet: 'Naboo' },
    { id: 3, name: 'Leia Organa', role: 'Rebel', planet: 'Alderaan'},
];

let nextCharacterId = characters.length > 0
    ? Math.max(...characters.map(character => character.id)) + 1
    : 1;

function getCharacters() {
    return characters;
}

function getCharacterById(id) {
    return characters.find(character => character.id === id);
}

function createCharacter(character) {
    const newCharacter = {
        id: nextCharacterId++,
        name: character.name,
        role: character.role,
        planet: character.planet,
    }

    characters.push(newCharacter);
    return newCharacter;
}

function updateCharacter(id, character) {
    const characterId = parseInt(id);
    const characterIndex = characters.findIndex(c => c.id === characterId);

    if (characterIndex === -1) {
        return null;
    }

    const updatedCharacter = {
        id: characterId,
        name: character.name,
        role: character.role,
        planet: character.planet
    };

    characters[characterIndex] = updatedCharacter;
    return updatedCharacter;
}

function deleteCharacter(id) {
    const characterId = parseInt(id);
    const characterIndex = characters.findIndex(c => c.id === characterId);

    if (characterIndex === -1) {
        return null;
    }

    const [deletedCharacter] = characters.splice(characterIndex, 1);
    return deletedCharacter;
}

module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};