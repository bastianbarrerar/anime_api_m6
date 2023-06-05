const { Router } = require('express');
const controller = require('./controller.js');


const router = Router();

router.get('/', controller.home);
router.get('/anime', controller.getAnimeAll);
router.get('/anime/:id', controller.getAnimebyId);
router.post('/anime/add/:id',controller.addNewAnime);
router.put('/anime/update/:id', controller.updateAnime);
router.delete('/anime/delete/:id', controller.deleteAnimeById);


module.exports = router;