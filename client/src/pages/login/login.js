import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

import NotesService from "../../service/NotesServices";
import "./Login.scss";

const Login = ({login}) => {
    const {userLog, requestStatus, singUp} = NotesService();
    const {status} = useSelector((state) => state.notes)

    const [newUser, setNewUser] = useState({
        id: '',
        name: '',
        surname: '',
        mail: '',
        notes: [],
        pass:''
    });
    const [userLogin, setUserLogin] = useState({
        mail: '',
        pass: ''
    })

    const addInfoNewUser = (e) => {
        switch (e.target.getAttribute('id')) {
            case 'name':
                return setNewUser((state) => { 
                    return{
                    ...newUser,
                    name: e.target.value
                }});
            case 'surname':
                return setNewUser((state) => { 
                    return{
                    ...newUser,
                    surname: e.target.value
                }});
            case 'mail':
            return setNewUser((state) => { 
                return{
                ...newUser,
                mail: e.target.value
            }});
            case 'pass':
            return setNewUser((state) => { 
                return{
                ...newUser,
                pass: e.target.value,
                id: uuidv4()
            }});
            default:
                return
        }
       
    }

    const enterUserInfo = (e) => {
        switch (e.target.getAttribute('id')) {
            case 'mail':
                return setUserLogin((state) => { 
                    return{
                    ...userLogin,
                    mail: e.target.value
                }});
            case 'pass':
                return setUserLogin((state) => { 
                    return{
                    ...userLogin,
                    pass: e.target.value
            }});
            default:
                return

        }
    }

    return login ? (
        <div className="auto">
            <h2>Вхід</h2>
            <form className="auto__form"
                onSubmit={(e) => userLog(e, userLogin)}>
                <input 
                    className="auto__form-login " 
                    type="text" 
                    id='mail' 
                    placeholder="Пошта"
                    onChange={enterUserInfo}
                    />
                <input 
                    className="auto__form-pass " 
                    type="text" 
                    id='pass' 
                    placeholder="Пароль"
                    onChange={enterUserInfo}/>

                <button 
                    className="auto__form-enter">Увійти</button>
                {requestStatus(status, 'Акаунт з таким логіном та паролем не знайдено!')}         
            </form>

            <div className="auto__singup">
                <p className="auto__singup-text">Ви ще не зареєстровані?</p>
                <Link 
                    to='/singup' 
                    className="auto__singup-button">Зареєструватись</Link>
            </div>
        </div>
    ) : (
        <div className="auto">
            <h2>Реєстрація</h2>
            <form 
                className="auto__form"
                onSubmit={(e) => singUp(e, newUser)}
                >
                <input 
                    className="auto__form-name " 
                    type="text" 
                    id='name' 
                    placeholder="І'мя"
                    onChange={addInfoNewUser}/>
                <input 
                    className="auto__form-login " 
                    type="text" 
                    id='surname' 
                    placeholder="Прізвище"
                    onChange={addInfoNewUser}/>
                <input 
                    className="auto__form-login " 
                    type="text" 
                    id='mail' 
                    placeholder="Логін"
                    onChange={addInfoNewUser}/>
                <input 
                    className="auto__form-pass " 
                    type="text" 
                    id='pass' 
                    placeholder="Пароль"
                    onChange={addInfoNewUser}/>

                <button
                    // to='/notes'
                    className="auto__form-enter"
                    >Зареєструватись</button>

                {requestStatus(status, 'Акаунт з таким логіном і паролем вже зареєстровано')}
            </form>

            <div className="auto__singup">
                <p className="auto__singup-text">Ви зареєстровані?</p>
                <Link 
                    to='/login' 
                    className="auto__singup-button">Увійти</Link>
            </div>
        </div>
    )    
}

export default Login;
