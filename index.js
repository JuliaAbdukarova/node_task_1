const yargs = require('yargs')
const pkg = require('./package.json')
const {addNote, printNotes, remove} = require('./notes.controller')

yargs.command( {
    command: 'add',
    describe: 'add a new note to the list',
    builder: {
        title: {
            type: 'string',
            desciption: 'Note title',
            demandOption: true,
        }
    },
    handler({title}) {
        addNote(title);
    }
})

yargs.command( {
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        const notes = await printNotes()
    }
})


yargs.command( {
    command: 'remove',
    describe: 'Removing a note ny id',
    builder: {
        id: {
            type: 'string',
            desciption: 'NoteId for removing',
            demandOption: true,
        }
    },

    async handler({id}) {
        const notes = await remove(id)
    }
})

yargs.parse()
