import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

import NotesService from "../../service/NotesServices";
import "./Login.scss";
import eyeIcon from '../../image/eye.webp'

const Login = ({login}) => {
    const {userLog, requestStatus, singUp} = NotesService();
    const {status} = useSelector((state) => state.notes);
    const [showPass, setShowPass] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);

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

    useEffect(() => {
        if (newUser.pass.length > 3 || userLogin.pass.length > 3) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    }, [newUser.pass, userLogin.pass])

    const styleFormInput = (atr, value) => {
        switch (atr) {
            case 'name':
                return value?.length > 3 || value?.length === 0 ? {} : {'border': '1px solid red'};
            case 'surname':
                return value?.length > 3 || value?.length === 0 ? {} : {'border': '1px solid red'};
            case 'mail':
                // eslint-disable-next-line
                return value?.match('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$') || value.length === 0 ? {} : {'border': '1px solid red'};
            case 'pass':
                
                return value?.length > 3 || value.length === 0 ? {} : {'border': '1px solid red'};
            default:
                return ;
        }
    }

    const addInfoNewUser = (e) => {
        switch (e.target.getAttribute('id')) {
            case 'name':
                styleFormInput('name', userLogin.name)
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
                    type="email" 
                    id='mail' 
                    placeholder="Пошта"
                    onChange={enterUserInfo}
                    required
                    style={styleFormInput('mail', userLogin.mail)}
                    />

                <label htmlFor="pass">
                    <input 
                        className="auto__form-pass " 
                        type={showPass ? 'text' : 'password'} 
                        id='pass' 
                        placeholder="Пароль"
                        onChange={enterUserInfo}
                        required
                        style={styleFormInput('pass', userLogin.pass)}/>
                
                    <img 
                        src={eyeIcon} 
                        className="auto__form-eye" 
                        alt="eye"
                        onClick={() => setShowPass(() => !showPass)} />
                </label>
                


                <button 
                    className="auto__form-enter"
                    disabled={disableBtn}>Увійти</button>
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
                    onChange={addInfoNewUser}
                    required
                    style={styleFormInput('name', newUser.name)}/>
                <input 
                    className="auto__form-login " 
                    type="text" 
                    id='surname' 
                    placeholder="Прізвище"
                    onChange={addInfoNewUser}
                    required
                    style={styleFormInput('surname', newUser.surname)}/>
                <input 
                    className="auto__form-login " 
                    type="email" 
                    id='mail' 
                    placeholder="Логін"
                    onChange={addInfoNewUser}
                    required
                    style={styleFormInput('mail', newUser.mail)}/>
                

                <label htmlFor="pass">

                    <input 
                        className="auto__form-pass " 
                        type={showPass ? 'text' : 'password'}  
                        id='pass' 
                        placeholder="Пароль"
                        onChange={addInfoNewUser}
                        required
                        style={styleFormInput('pass', newUser.pass)}/>
                    <img 
                        src={eyeIcon} 
                        className="auto__form-eye" 
                        alt="eye"
                        onClick={() => setShowPass(() => !showPass)} />
                </label>    
                

                <button
                    // to='/notes'
                    className="auto__form-enter"
                    disabled={disableBtn}
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
