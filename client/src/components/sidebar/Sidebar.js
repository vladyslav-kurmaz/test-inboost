import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import request from '../../http.hook/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { notesAdd, notesActive, disableTextArea, notesShowPopup, notesTypeOfAction, user, usersId } from '../listItem/ListItemStore';
import {textAreaRef} from '../context/context';

import './Sidebar.scss'

import plusIcon from '../../image/plus.webp';
import deleteIcon from '../../image/delete.webp';
import editIcon from '../../image/edit.webp';
import exitIcon from '../../image/exit.webp';

const Sidebar = () => {
    const dispatch = useDispatch();
    const {noteActiveId, disabled, userId, activeUser} = useSelector(state => state.notes);
    const textArea = useContext(textAreaRef);
    const navigate = useNavigate();

    const ifZero = (num) => {
        return num < 10  ? `0${num}` : num;
    }
    
    const addNewNote = () => {
        const date = new Date();
        const abr = date.getHours() >= 0 || date.getHours() <= 12 ? 'PM' : 'AM';
        const time = `${ifZero(date.getHours())}:${ifZero(date.getMinutes())} ${abr}`;
        const id = uuidv4();

        const info = {
            "id": id,
            "time": time,
            "description": ""
        };

        dispatch(notesActive(id));
        const addNotes = JSON.parse(JSON.stringify(activeUser))
        console.log(addNotes);
        addNotes.notes.push(info)

        const json = JSON.stringify(addNotes.notes);

        request(`https://test-inboost-api.onrender.com/users/${userId}`, 'PATCH', json)
            .then(dispatch(notesAdd(info)))
            .then(dispatch(disableTextArea(false)))
            .then(() => textArea.current.focus())
    }

    const openPopup = () => {
        dispatch(notesShowPopup(true));
    }

    const editNote = () => {
        const activeTeaxtArea = async() => {
            await dispatch(disableTextArea(!disabled))
            textArea.current.focus()
        }

        return noteActiveId ? activeTeaxtArea() : null
    }

    const exitFromNotates = () => {
        navigate('/');
        dispatch(user(null));
        dispatch(usersId(null));
        
    }

    return (
        <div className='sidebar'>
            <button 
                className='sidebar__button sidebar__add'
                onClick={addNewNote}>
                <img 
                    src={plusIcon} 
                    className='sidebar__button-icon' 
                    alt='icon plus' />
            </button>
            <button 
                className='sidebar__button sidebar__delete'
                onClick={openPopup}
                disabled={noteActiveId === null ? true : false}>
                <img 
                    src={deleteIcon} 
                    className='sidebar__button-icon' 
                    alt="icon delete" />
            </button>
            <button 
                className='sidebar__button sidebar__edit'
                onClick={editNote}
                disabled={noteActiveId === null ? true : false}>
                <img 
                    src={editIcon} 
                    className='sidebar__button-icon' 
                    alt="icon edit"/>
            </button>
            {activeUser ? (
                <button 
                    className='sidebar__button sidebar__exit'
                    onClick={exitFromNotates}>
                    <img 
                        src={exitIcon} 
                        className='sidebar__button-icon' 
                        alt="icon edit"/>
                </button>) : null}
        </div>
    )
}

export default Sidebar;