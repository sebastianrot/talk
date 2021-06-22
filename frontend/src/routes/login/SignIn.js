import './SignIn.css';

const SignIn = ({ handleClick, loginEmail, setLoginEmail, loginPassword, setLoginPassword, err }) => {
    return(
        <section className='section-signin'>
            <h1 style={{fontWeight: 'bold', color: '#1a202c'}}>Sign In</h1>
            <input type='email' placeholder='Email' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className={`inputEmail-login input-login ${err ? 'input-error' : ''}`} />
            <input type='password' placeholder='Hasło' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className={`inputPassword-login input-login ${err ? 'input-error' : ''}`}/>
            <button onClick={handleClick} className='btn-login'>Zaloguj się</button>
            <span style={{color: 'red'}}>{err}</span>
        </section>
    )
}

export default SignIn