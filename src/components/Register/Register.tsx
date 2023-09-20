import './Register.css';
import { useContext, useEffect, useState } from 'react';
import UserHandler from '../../handlers/userHandler';
import RegisterFormData from '../../models/forms/registerFormData';
import { AlertContext } from '../../contexts/AlertContext';

function Register() {

  const { setAlertContext } = useContext(AlertContext);
  const userHandler = new UserHandler();

  const [formData, setFormData] = useState(new RegisterFormData());
  const [validationErrorMsg, setvalidationErrorMsg] = useState("" as string);

  const validateForm = () => {
    if (!formData.userName) {
      setvalidationErrorMsg("User name cannot be empty.");
      return false;
    }
    if (formData.userName.length > 30) {
      setvalidationErrorMsg("User name cannot have more than 30 characters.");
      return false;
    }
    const alphanumerical = /^[A-Za-z0-9]+$/;
    if (!alphanumerical.test(formData.userName)) {
      setvalidationErrorMsg("User name can contain only letters and numbers.");
      return false;
    }
    if (!formData.userEmail) {
      setvalidationErrorMsg("User email cannot be empty.");
      return false;
    }
    if (formData.userEmail.length > 60) {
      setvalidationErrorMsg("User name cannot have more than 60 characters.");
      return false;
    }
    const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.test(formData.userEmail)) {
      setvalidationErrorMsg("Email is invalid.");
      return false;
    }
    if (!formData.userPassword) {
      setvalidationErrorMsg("User password cannot be empty.");
      return false;
    }
    if (formData.userPassword.length < 12) {
      setvalidationErrorMsg("User password cannot be shorter than 12 characters.");
      return false;
    }
    if (formData.userEmail.length > 30) {
      setvalidationErrorMsg("User password cannot have more than 30 characters.");
      return false;
    }
    if (formData.userEmail != formData.confirmUserEmail) {
      setvalidationErrorMsg("The given e-mail adresses do not match.");
      return false;
    }
    if (formData.userPassword != formData.confirmUserPassword) {
      setvalidationErrorMsg("The given passwords do not match.");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (validationErrorMsg) {
      setAlertContext(
        {
          isOpen: true,
          modalText: validationErrorMsg,
          isConfirm: false,
          onClose(accept: boolean) {
            setvalidationErrorMsg("");
          }
        });
    }
  }, [validationErrorMsg]);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values: any) => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    userHandler.register(formData).then(
      function () {
        setAlertContext(
          {
            isOpen: true,
            modalText: "Successful registration.",
            isConfirm: false,
            onClose(accept: boolean) { }
          }
        );
        setFormData(new RegisterFormData());
      },
      function (error: any) {
        setAlertContext(
          {
            isOpen: true,
            modalText: error.response.data.message.result,
            isConfirm: false,
            onClose(accept: boolean) { }
          });
      });
  }

  return (
    <div>
      <br></br>
      <div className='hor-ver-center-cnt'>
        <form noValidate onSubmit={handleSubmit} id='Register__form' className='card bg-light mb-3 hor-ver-center-cnt'>
          <div>
            <h5 className='hor-ver-center-cnt'>Register</h5>
            <br></br>
          </div>
          <div className='inpt-contnr hor-ver-center-cnt'>
            <div className='dflt-column hor-ver-center-cnt margin-right-10'>
              <label>
                User name:
              </label>
              <br></br>
              <label className='margin-bottom-2'>
                E-mail:
              </label>
              <label>
                Confirm e-mail:
              </label>
              <br></br>
              <label className='margin-bottom-2'>
                Password:
              </label>
              <label>
                Confirm password:
              </label>
            </div>
            <div className='dflt-column hor-ver-center-cnt'>
              <input
                autoComplete="off"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
              <br></br>
              <input className='margin-bottom-2'
                autoComplete="off"
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
              />
               <input
                autoComplete="off"
                type="email"
                name="confirmUserEmail"
                value={formData.confirmUserEmail}
                onChange={handleChange}
              />
              <br></br>
              <input className='margin-bottom-2'
                autoComplete="off"
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleChange}
              />
               <input
                autoComplete="off"
                type="password"
                name="confirmUserPassword"
                value={formData.confirmUserPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <br></br>
          <div className='hor-ver-center-cnt'>
            <button className='dflt-btn' type="submit">Accept</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;