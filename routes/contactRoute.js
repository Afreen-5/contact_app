const express = require('express');
const { getAllContacts, addContact, updateContactById, deleteContact, getContactById } = require('../controller/contactController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();

router.use(validateToken); // auth guard for all the routes declared below
router.route('/').post(addContact).get(getAllContacts);
router.route('/:id').get(getContactById).patch(updateContactById).delete(deleteContact);

module.exports = router;