let express = require('express'),
    router = express.Router(),
    path = '/user';

router.get(path, (req, res) => require('../controllers/userCtrl').get(req, res));
router.post(path, (req, res) => require('../controllers/userCtrl').post(req, res));

module.exports = router;
