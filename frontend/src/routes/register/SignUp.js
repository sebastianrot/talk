import './SignUp.css';

const SignUp = ({ states, errors}) => {
    return(
        <section className='section-signup'>
            <input type='text' placeholder='Podaj nazwe użytkownika' value={states.registerUsername} onChange={(e)=>states.setRegisterUsername(e.target.value)} className='inputUsername-register input-register'/>
            <input type='email' placeholder='Podaj emaila' value={states.registerEmail} onChange={(e)=>states.setRegisterEmail(e.target.value)} className='inputEmail-register input-register'/>
            <input type='password' placeholder='Podaj swoje hasło' value={states.registerPassword} onChange={(e)=>states.setRegisterPassword(e.target.value)} className='inputPassword-register input-register'/>
            <div>
            <input type='checkbox' checked={states.registerChecked} onChange={(e)=>states.setRegisterChecked(e.target.checked)} className='checkbox-register' id='regulations'/>
            <label htmlFor='regulations'>Zaakceptuj regulamin</label>
            </div>
            <button onClick={states.handleClick} className={`btn-register ${states.invisible ? 'btn-disabled' : ''}`} disabled={states.invisible}>Zarejestruj się</button>
            {errors}
        </section>
    )
}

export default SignUp