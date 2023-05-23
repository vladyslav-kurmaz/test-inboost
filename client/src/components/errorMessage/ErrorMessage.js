import errorGif from './error.gif';

const ErrorMessage = ({message}) => {
    return (
        <>
            <h3>{message}</h3>
            <img src={errorGif} 
                alt="Error" 
                style={{display: 'block', width: '150px', height: '150px', objectFit: 'contain', margin: '0 auto'}}/>
        </>
    )
}

export default ErrorMessage