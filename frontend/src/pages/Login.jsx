import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    firstname: '',
    name: '',
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    let responseData;
    await fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.error);
    }
  };

  const signup = async () => {
    const { firstname, name, email, password } = formData;
    if (!firstname || !name || !email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, name, email, password }),
    })
      .then(response => response.json())
      .then(data => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.error);
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
                name='name'
                type='text'
                value={formData.name}
                onChange={changeHandler}
                placeholder='Votre nom'
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
