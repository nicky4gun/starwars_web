const characterList = document.getElementById('characterList');
const errorMessage = document.getElementById('error');

async function loadCharacters() {
    try {
        const response = await fetch('/characters');

        if (!response.ok) {
            errorMessage.textContent = 'Error: Could not find any characters.'
            return;
        }

        const characters = await response.json();
        characterList.innerHTML = '';

        characters.forEach(character => {
            const li = document.createElement('li');
            li.textContent = `${character.name} (${character.role}) - ${character.planet}`
            characterList.appendChild(li);
        })
    } catch (error) {
        console.log(error);
    }
}

const characterForm = document.getElementById('characterForm');
characterForm.addEventListener('submit', addCharacter);

async function addCharacter(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const character = {
        name: formData.get('characterName'),
        role: formData.get('characterRole'),
        planet: formData.get('characterPlanet')
    };

    try {
        const response = await fetch('/characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character)
        });

        if (!response.ok) {
            const errors = await response.json();
            errorMessage.textContent = `Error: ${errors.error}`;
            return;
        }

        const createdCharacters = await response.json();
        errorMessage.textContent = ''

        await loadCharacters();
    } catch (error) {
        console.log(error);
    }
 
    form.reset();
}

loadCharacters();

const roles = ['Jedi', 'Sith', 'Bounty Hunter', 'Smuggler', 'Droid', 'Rebel', 'Imperial'];

const roleSelect = document.getElementById('characterRole');

roles.forEach(role => {
    const option = document.createElement('option');
    option.value = role;
    option.textContent = role;
    roleSelect.appendChild(option);
});