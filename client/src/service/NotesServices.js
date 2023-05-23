import request from "../http.hook/http.hook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usersId, user, changeStatus } from "../components/listItem/ListItemStore";
import Spiner from "../components/spiner/spiner";
import ErrorMessage from "../components/errorMessage/ErrorMessage"

const NotesService = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const requestStatus = (status, message) => {
        switch (status) {
            case 'idle': 
                return;
            case 'loading': 
                return (
                    <Spiner/>
                );
            case 'error': 
                return (
                    <ErrorMessage message={message}/>
                );
            default:
                return
        }
    }

    const userLog = (e, userLogin) => {

        dispatch(changeStatus('loading'));
        e.preventDefault();
        request('https://test-inboost-api.onrender.com/users')
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
            .then(() => {
                navigate('/notes')
                dispatch(changeStatus('idle'));
            })
            .catch((e) => {
                console.error(e);
                dispatch(changeStatus('error'));
                setTimeout(() => dispatch(changeStatus('idle')), 3000)
            })
            .finally(() => e.target.reset())
    
    
    }

    const singUp = (e, newUser) => {
        e.preventDefault();
        dispatch(usersId(newUser.id))
        dispatch(changeStatus('loading'));

        request('https://test-inboost-api.onrender.com/users')
            .then(res => res.filter(item => {
                return item.mail === newUser.mail && item.pass === newUser.pass;
            }))
            .then(res => {
                const json = JSON.stringify(newUser)
                res.length > 0 ? dispatch(changeStatus('error')) : request('https://test-inboost-api.onrender.com/users', 'POST', json)
                .then(() => {
                    navigate('/login')
                    dispatch(changeStatus('idle'));
                    window.location.reload()
                })
                .catch((e) => {
                    console.error(e);
                    dispatch(changeStatus('error'));
                })
                .finally(() => e.target.reset())
            })
            

        



        
            

    }

    const getUserFromId = (userId, json) => {
        request(`https://test-inboost-api.onrender.com/users/${userId}`, 'PATCH', json)
        .catch(error => console.error(error))
    } 

    return {
        userLog,
        singUp,
        requestStatus,
        getUserFromId
    }
}

export default NotesService;