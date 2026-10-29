const express = require('express');
const characterController = require('../controllers/characterController');
const { validateId } = require('../middleware/validate');
const { validateCharacterData } = require('../middleware/validatecharacterdata');

const router = express.Router();

router.get('/', characterController.getCharacters);
router.get('/:id',validateId, characterController.getCharacterById);
router.post('/', validateCharacterData, characterController.createCharacter);
router.put('/:id', validateId, validateCharacterData, characterController.updateCharacter);
router.delete('/:id', validateId, characterController.deleteCharacter);

module.exports = router;