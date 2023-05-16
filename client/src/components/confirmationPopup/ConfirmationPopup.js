import { useDispatch, useSelector } from 'react-redux';
import request from '../../http.hook/http.hook'
import { notesDelete, notesActive, notesShowPopup, disableTextArea } from '../listItem/ListItemStore';

import './ConfirmationPopup.scss';

const ConfirmationPopup = () => {
    const dispatch = useDispatch();
    const {noteActiveId, userId, activeUser} = useSelector(state => state.notes)

    const changeDelete = (e) => {
        
        const deleteNotes = JSON.parse(JSON.stringify(activeUser))
        deleteNotes.notes = deleteNotes.notes.filter(item => item.id !== noteActiveId)
        
        const json = JSON.stringify(deleteNotes)
        dispatch(notesActive(null))
        return e.target.getAttribute('data-type') === 'true' ?  request(`https://test-inboost-api.onrender.com/users/${userId}`, 'PATCH', json)
            .then(() => dispatch(notesDelete(noteActiveId)))
            .then(() => dispatch(disableTextArea(true)))
            .then(() => dispatch(notesShowPopup(false)))

            : dispatch(notesShowPopup(false));        
    }

    return (
        <div className="popup">
            <div className="popup__container">
                <p className="popup__container-text">Ви дійсно бажаєте видалити цю нотатку?</p>
                <div className="popup__container-button-container">
                    <button 
                        className="popup__container-button-container button" 
                        data-type={true}
                        onClick={changeDelete}>Так</button>
                    <button 
                        className="popup__container-button-container button" 
                        data-type={false}
                        onClick={changeDelete}>Ні</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopup;