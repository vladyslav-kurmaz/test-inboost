import { useDispatch } from 'react-redux';
import { notesSingup } from '../../components/listItem/ListItemStore';
import { Link } from 'react-router-dom';

import './FirstPage.scss';

const FirstPage = () => {
    const dispatch = useDispatch();

    const onClick = (e) => {
        dispatch(notesSingup(e.target.getAttribute('data-singup')));
    } 

    return (
        <div className="first-page">
            <div className="first-page__container">
                <h2 className="first-page__container-title">Якщо ви маєте акаунт увійдіть, ні тоді реєструйтесь</h2>
                <div className="first-page__container-buttons">
                    <Link 
                        to='/login' 
                        className="first-page__container-buttons button" 
                        data-singup={true}
                        onClick={onClick}>Вхід</Link>
                    <Link   
                        to='/singup' 
                        className="first-page__container-buttons button" 
                        data-singup={false}
                        onClick={onClick}>Реєстрація</Link>
                </div>
            </div>
        </div> 
    )
}

export default FirstPage;