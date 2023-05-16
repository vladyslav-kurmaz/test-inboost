import { useEffect, useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '../../http.hook/http.hook';
import dataContext from '../context/context';
import {textAreaRef} from '../context/context';
import { notesChangeText, disableTextArea } from '../listItem/ListItemStore';

import './Workspace.scss';

const Workspace = () => {
    
    const dispatch = useDispatch();
    const {noteActiveId, disabled, activeUser, userId} = useSelector(state => state.notes)
    const {notes} = activeUser;
    const textArea = useContext(textAreaRef);

    const onChange = (e) =>  {
        dispatch(notesChangeText(e.target.value));

        const editNotes = JSON.parse(JSON.stringify(activeUser))

        editNotes.notes.filter(item => item.id === noteActiveId ? item.description = e.target.value : '')

        const json = JSON.stringify(editNotes.notes);
        console.log(json);
        request(`http://localhost:3001/users/${userId}`, 'PATCH', json)
            // .then((res) => console.log(res))
            .catch(error => console.error(error))
    }
    
    const activeNote = noteActiveId !== null ? notes?.filter(item => item.id === noteActiveId ) : [{'description': ''}];
    const activeNoteValue = activeNote[0].description ? activeNote[0].description : ''
    return (
        <div className="workspace">
            <textarea 
                disabled={disabled}
                ref={textArea}
                className="workspace__textarea" 
                onChange={onChange} 
                value={activeNoteValue}></textarea>
        </div>
    )
}

export default Workspace;