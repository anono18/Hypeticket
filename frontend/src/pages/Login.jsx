import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    firstname: '',
    username: '',
    password: '',
    email: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login function executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("signup function executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <section className='login-container'>
      <div className='login-box'>
        <h3 className='login-header underline'>{state}</h3>
        <div className='login-form'>
          {state === "Sign Up" && (
            <>
              <input
                name='firstname'
                type='text'
                value={formData.firstname}
                onChange={changeHandler}
                placeholder='Votre prénom'
                className='login-input'
              />
              <input
                name='username'
                type='text'
                value={formData.username}
                onChange={changeHandler}
                placeholder='Votre nom d’utilisateur'
                className='login-input'
              />
            </>
          )}
          <input
            name='email'
            type='email'
            value={formData.email}
            onChange={changeHandler}
            placeholder='Votre email'
            className='login-input'
          />
          <input
            name='password'
            type='password'
            value={formData.password}
            onChange={changeHandler}
            placeholder='Mot de passe'
            className='login-input'
          />
        </div>
        <div className="shimmer-button-container mt-4">
          <button onClick={() => (state === "Login" ? login() : signup())} className="shimmer-button">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
              Continuer
            </span>
          </button>
        </div>
        <p className='toggle-link'>
          {state === "Sign Up" ? (
            <>Déjà un compte? <span onClick={() => setState("Login")}>Connexion</span></>
          ) : (
            <>Créer un compte? <span onClick={() => setState("Sign Up")}>Cliquez ici</span></>
          )}
        </p>
        <div className='terms-container'>
          <label htmlFor="terms">En continuant, j’accepte les conditions d’utilisation et la politique de confidentialité.</label>
        </div>
      </div>
    </section>
  );
};

export default Login;
