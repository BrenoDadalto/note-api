const notesRouter = require('express').Router();
const noteController = require('../controllers/noteController');

notesRouter.post('/add', noteController.createNote);
notesRouter.get('/read', noteController.getAllNotes);
notesRouter.get('/read/:id', noteController.getNote);
notesRouter.patch('/update/:id', noteController.updateNote);
notesRouter.delete('/delete/:id', noteController.deleteNote)

module.exports = notesRouter;