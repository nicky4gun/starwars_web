const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const characters = [
    { id: 1, name: 'Luke Skywalker',role: 'Jedi Knight',planet: 'Tatooine' },
    { id: 2, name: 'Darth Vader', role: 'Sith Lord', planet: 'Naboo' },
    { id: 3, name: 'Leia Organa', role: 'Rebel Alliance Leader', planet: 'Alderaan' }
];

app.get('/characters' , (req, res) => {
    res.status(200).json( characters );
})

app.get('/characters/:id', (req, res) => {
    const characterId = parseInt(req.params.id);
    const character = characters.find(c => c.id === characterId);

    if (character) {
        res.status(200).json(character);
    } else {
        res.status(404).json({ message: 'Character not found' });
    }
})

app.post('/characters', (req, res) => {
    const newCharacter = {
        id: characters.length + 1,
        name: req.body.name,
        role: req.body.role,
        planet: req.body.planet,
    }
    if (!newCharacter.name || !newCharacter.role || !newCharacter.planet) {
        res.status(400).json({ message: 'Missing required fields' });
    } else {
        characters.push(newCharacter);
        res.status(201).json(newCharacter);
    }
})
app.put('/characters/:id', (req, res) => {
    const characterId = parseInt(req.params.id);
    const characterIndex = characters.findIndex(c => c.id === characterId);

    if (characterIndex !== -1) {
        const updatedCharacter = {
            id: characterId,
            name: req.body.name || characters[characterIndex].name,
            role: req.body.role || characters[characterIndex].role,
            planet: req.body.planet || characters[characterIndex].planet
        };
        characters[characterIndex] = updatedCharacter;
        res.status(200).json(updatedCharacter);
    } else {
        res.status(404).json({ message: 'Character not found' });
    }
})
app.delete('/characters/:id', (req, res) => {
    const characterId = parseInt(req.params.id);
    const characterIndex = characters.findIndex(c => c.id === characterId);

    if (characterIndex !== -1) {
        characters.splice(characterIndex, 1);
        res.status(200).json({ message: 'Character deleted successfully' });
    } else {
        res.status(404).json({ message: 'Character not found' });
    }
})