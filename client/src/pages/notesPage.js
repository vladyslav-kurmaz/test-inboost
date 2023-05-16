import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

import Sidebar from '../components/sidebar/Sidebar';
import SearchBox from '../components/searchBox/SearchBox';
import ListItem from '../components/listItem/ListItem';
import Workspace from '../components/workspace/Workspace';
import ConfirmationPopup from '../components/confirmationPopup/ConfirmationPopup';

import {textAreaRef} from '../components/context/context'
import request from '../http.hook/http.hook';
import {notesFeching, notesFeched, notesError, notesShowPopup, user, usersId} from '../components/listItem/ListItemStore'


function NotesPage({id}) {
    const textArea = useRef(null);
  
    const dispatch = useDispatch();
    const {notes, notesLoadingStatus, noteActiveId, showPopup, singup, activeUser} = useSelector(state => state.notes);
  
    const {Provider} = textAreaRef;
  
    useEffect(() => {
        
            request(`https://test-inboost-api.onrender.com/users`)
                .then((res) =>  {
                  return res.filter(item => {
                    
                    return item.id === localStorage.getItem('user') 
                })
                })
                .then((res) => {
                    dispatch(usersId(localStorage.getItem('user')))
                    return dispatch(user(res))
                })

            // return localStorage.getItem('user') ? dispatch(usersId(localStorage.getItem('user'))) : null;
      // eslint-disable-next-line
      
    }, [])


    return (
  
      
      <Provider value={textArea}>
        {showPopup ? <ConfirmationPopup/> : null}
        <header className='header'>
          <Sidebar/>
          <SearchBox/>
        </header>
        <main className='main'>
          <ListItem/>
          <Workspace/>
        </main>
      </Provider>
    );
  }

export default NotesPage;