import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import Sidebar from '../components/sidebar/Sidebar';
import SearchBox from '../components/searchBox/SearchBox';
import ListItem from '../components/listItem/ListItem';
import Workspace from '../components/workspace/Workspace';
import ConfirmationPopup from '../components/confirmationPopup/ConfirmationPopup';

import {textAreaRef} from '../components/context/context'
import request from '../http.hook/http.hook';
import {notesActive, user, usersId, changeDisplay} from '../components/listItem/ListItemStore'
import './notesPage.scss'

import arrow from '../image/arrow.webp';

function NotesPage({id}) {
    const textArea = useRef(null);
  
    const dispatch = useDispatch();
    const { showPopup, changeListOrWorkspace} = useSelector(state => state.notes);
  
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
                    dispatch(user(res))
                })
      // eslint-disable-next-line      
    }, [])

    const exitFromNotate = () => {
      dispatch(changeDisplay(true));
      dispatch(notesActive(null))
    }

    const exitButton = () => {
      const screenWidth = window.screen.width;
        if (screenWidth < 505) {
        return !changeListOrWorkspace ? (
          <button 
              className='sidebar__button sidebar__exit'
              onClick={exitFromNotate}>
              <img 
                  src={arrow} 
                  className='sidebar__button-icon' 
                  alt="icon edit"/>
          </button>) : null
        }
    }

    return (
  
      
      <Provider value={textArea}>
        {showPopup ? <ConfirmationPopup/> : null}
        <header className='header'>
          <Sidebar/>
          <SearchBox/>
          {exitButton()}
        </header>
        <main className='main'>
          <ListItem/>
          <Workspace/>
        </main>
      </Provider>
    );
  }

export default NotesPage;