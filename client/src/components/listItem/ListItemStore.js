import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    notesLoadingStatus: 'idle',
    noteActiveId: null,
    curentNote: null,
    disabled: true,
    showPopup: false,
    temp: '',
    singup: null,
    userId: '',
    activeUser: '',
    changeListOrWorkspace: true
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        notesActive: (state, action) => {
            state.noteActiveId = action.payload;
        },
        notesCurrent: (state, action) => {
            state.curentNote = action.payload;
        },
        notesChangeText: (state, action) => {
            state.activeUser.notes.filter(note => {
                return note.id === state.noteActiveId ? 
                    note.description = action.payload : note 
            })
        },
        notesAdd: (state, action) => {
            state.activeUser.notes.push(action.payload)
        },
        notesShowPopup: (state, action) => {
            state.showPopup = action.payload
        },
        notesDelete: (state, action) => {
            state.activeUser.notes = state.activeUser.notes.filter(item => item.id !== action.payload)
        },
        disableTextArea: (state, action) => {
            state.disabled = action.payload
        },
        notesSearch: (state, action) => {
            state.temp = action.payload
        },
        notesSingup: (state, action) => {
            state.singup = action.payload
        },
        usersId: (state, action) => {
            state.userId = action.payload
        },
        user: (state, action) => {
            state.activeUser = action.payload[0]
        },
        allUsers: (state, action) => {
            state.users = [...state.users, ...action.payload]
        },
        changeDisplay: (state, action) => {
            state.changeListOrWorkspace = action.payload
        }
    }
})

const {actions, reducer} = notesSlice;

export default reducer;
export const  {
    notesActive,
    notesChangeText,
    notesDelete,
    notesAdd,
    disableTextArea,
    notesSearch,
    notesShowPopup,
    notesSingup,
    usersId,
    user,
    allUsers,
    changeDisplay
} = actions;
