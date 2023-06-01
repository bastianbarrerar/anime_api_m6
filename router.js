const { Router } = require('express');
const controller = require('./controller.js');


const router = Router();

router.get('/:id', controller.getAnimebyId);
router.post('/add/:id',controller.addNewAnime);
router.put('/:id', controller.updateAnime);
router.delete('/:id', controller.deleteAnimeById);


module.exports = router;