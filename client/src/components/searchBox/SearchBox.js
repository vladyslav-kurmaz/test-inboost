import { useDispatch, useSelector } from 'react-redux';
import { notesSearch } from '../listItem/ListItemStore';
import './SearchBox.scss';

const SearchBox = () => {
    const dispatch = useDispatch();
    const {temp} = useSelector(state => state.notes);

    const onChange = (e) => {
        dispatch(notesSearch(e.target.value));
    }   

    return (
        <div className="search-box">
            <input 
                type="text" 
                className='search-box__input' 
                value={temp} 
                onChange={onChange}
                placeholder='Search'/>
        </div>
    )
}

export default SearchBox;