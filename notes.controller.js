const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json')
async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green(('The note is added.')))
};

async function  getNotes() {
    const notes = await fs.readFile(notesPath,{encoding:'utf-8'})
    const result = Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];

    return result
};

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue('Here is a list of notes'))
    notes.forEach(note => {
        console.log(chalk.red(note.title))
    })
}

async function remove(id) {
    const notes = await getNotes();

    const index = notes.findIndex(note => note.id === id);
    if (index > -1) {
        notes.splice(index, 1);
    }

    await fs.writeFile(notesPath, JSON.stringify(notes))
}

module.exports = {
    addNote,
    printNotes,
    remove,
}
