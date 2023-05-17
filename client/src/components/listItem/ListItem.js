import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { notesActive, changeDisplay } from './ListItemStore';
import { textAreaRef } from '../context/context';
import './ListItem.scss'

const ListItem = () => {
  const dispatch = useDispatch();
  const {noteActiveId, temp, activeUser, changeListOrWorkspace} = useSelector(state => state.notes);

  const textArea = useContext(textAreaRef);

  const changeSlide = () => {
    const screenWidth = window.screen.width
    if (screenWidth < 505) {
      return changeListOrWorkspace ? {'display': 'block'} : {'display': 'none'}
    }
  }

  const onActive =  (id) => {
    dispatch(changeDisplay(false))
    changeSlide();

    textArea.current.focus();
    
    return id !== noteActiveId ? dispatch(notesActive(id)) : null
  }

  const style = (id) => {

    return id === noteActiveId ? {
      'backgroundColor': '#c4c4c4'
      
    } : null
  }

  const searchNote = (items, temp) => {
    return items.notes.filter(item => {
      return item.description.toLowerCase().indexOf(temp.toLowerCase()) > -1;
    })
  }

  const renderNote = (data) => {
    const afterFilters = searchNote(data, temp);

    return afterFilters?.map(({id, time, description}) => {
      const desc = description?.length > 20 ?  `${description.slice(0, 21)}...` : description;
      const titl = description?.length > 19 ? `${description.slice(0, 19)}...` : `${description.slice(0, 19)}`;

      return (
        <li 
          className="notes__list-item" 
          onClick={() => onActive(id)} 
          key={id}
          style={style(id)}>
          <h3 className="notes__list-item-title">{titl}</h3>
          <div className="notes__list-item-info">
            <span className="notes__list-item-info-time">{time}</span>
            <p className="notes__list-item-info-desc">{desc}</p>
          </div>
        </li>
      )
    })
  }

  return (
    <div className="notes" style={changeSlide()}>
      <ul className="notes__list">
        {renderNote(activeUser ? activeUser : null)}
      </ul>
    </div>
  )
}

export default ListItem