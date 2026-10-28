const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router();

router.get('/', characterController.getCharacters);
router.get('/:id', characterController.getCharacterById);
router.post('/', characterController.createCharacter);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;