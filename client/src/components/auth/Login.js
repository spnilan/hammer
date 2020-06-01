import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types'

const Login = ( { login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password)
        console.log(formData)
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <section className='text-center'>
            <form className='form-signin' onSubmit={onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input type="email" name="email" className="form-control" placeholder="Email address" 
                       required autoFocus value={email} onChange={onChange} />
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" 
                       required value={password} onChange={onChange} />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        </section>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
