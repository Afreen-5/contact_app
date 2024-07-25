// instead of using try-catch block in each control - this will send if there is an error to errorHandler
const asyncHandler = require('express-async-handler'); 
const Contact = require('../model/contactModel');

const addContact = asyncHandler (async (req,res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
})

const getAllContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404)
        throw new Error("Contact not found");
    }
    res.json(contact);
})

const updateContactById = asyncHandler (async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.json(updatedContact);
})

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove();
    res.json(contact);
})

module.exports = {
    addContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteContact
}