import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from "react-router-dom";
import request from "../../http.hook/http.hook";
import { usersId, notesFeched, user } from "../../components/listItem/ListItemStore";
import "./Login.scss";

const Login = ({login}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notes, activeUser } = useSelector(state => state.notes);

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

    const singUp = (e) => {
        e.preventDefault();
        dispatch(usersId(newUser.id))
        
        const json = JSON.stringify(newUser)

        request('https://test-inboost-api.onrender.com/users', 'POST', json)
            .then(() => navigate('/login'))
            .catch((e) => console.error(e))
    }

    const userLog = (e) => {
        e.preventDefault();
        // console.log(activeUser);
        request('https://test-inboost-api.onrender.com/users')
            // .then(console.log)
            .then(res => res.filter(item => {
                    return item.mail === userLogin.mail && item.pass === userLogin.pass
                }))
            .then((res) => {
                localStorage.setItem('user', res[0].id);
                localStorage.setItem('mail', res[0].mail);
                localStorage.setItem('pass', res[0].pass);
                return res;
            })
            .then((res) => {
                dispatch(user(res))
                dispatch(usersId(res[0].id))
            } )
            .then(() => navigate('/notes'))


    }

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
            }})

        }
    }

    return login ? (
        <div className="auto">
            <h2>Вхід</h2>
            <form className="auto__form"
                onSubmit={userLog}>
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
                onSubmit={singUp}
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

{/* <form className="auto__form">
    <label 
        className="auto__form-name " 
        htmlFor="name">І'мя</label>
    <input 
        className="auto__form-name " 
        type="text" 
        id='name' />
    <label 
        className="auto__form-surnames " 
        htmlFor="surnames">Прізвище</label>
    <input 
        className="auto__form-login " 
        type="text" 
        id='login' />
    <label 
        className="auto__form-login " 
        htmlFor="login">Логін</label>
    <input 
        className="auto__form-login " 
        type="text" 
        id='login' />
    <label 
        className="auto__form-pass " 
        htmlFor="pass">Пароль</label>
    <input 
        className="auto__form-pass " 
        type="text" 
        id='pass' />

    <button className="auto__form-enter">Зареєструватись</button>
</form> */}