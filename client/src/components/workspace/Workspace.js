import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '../../http.hook/http.hook';
import {textAreaRef} from '../context/context';
import { notesChangeText } from '../listItem/ListItemStore';

import './Workspace.scss';

const Workspace = () => {
    
    const dispatch = useDispatch();
    const {noteActiveId, disabled, activeUser, userId, changeListOrWorkspace} = useSelector(state => state.notes)
    const {notes} = activeUser;
    const textArea = useContext(textAreaRef);

    const onChange = (e) =>  {
        dispatch(notesChangeText(e.target.value));

        const editNotes = JSON.parse(JSON.stringify(activeUser))

        editNotes.notes.filter(item => item.id === noteActiveId ? item.description = e.target.value : '')

        const json = JSON.stringify(editNotes.notes);
        request(`https://test-inboost-api.onrender.com/users/${userId}`, 'PATCH', json)
            .catch(error => console.error(error))
    }

    const showWorkspace = () => {
        const screenWidth = window.screen.width;
        if (screenWidth < 505) {
            return !changeListOrWorkspace ? {'display': 'block'} : {'display': 'none'}
        }
        
    }
    
    const activeNote = noteActiveId !== null ? notes?.filter(item => item.id === noteActiveId ) : [{'description': ''}];
    const activeNoteValue = activeNote[0].description ? activeNote[0].description : ''
    return (
        <div className="workspace" style={showWorkspace()}>
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