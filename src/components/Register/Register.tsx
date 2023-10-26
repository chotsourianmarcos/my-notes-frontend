import './Register.css';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AlertContext } from '../../contexts/AlertContext';
import UserHandler from '../../handlers/userHandler';
import RegisterFormData from '../../models/forms/registerFormData';
import { UserContext } from '../../contexts/UserContext';
import regex from '../../resources/regexs';

function Register() {
  const { strings } = useContext(LanguageContext);
  const { setAlertContext } = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const userHandler = new UserHandler(userContext);

  const [formData, setFormData] = useState(new RegisterFormData());
  const [validationErrorMsg, setvalidationErrorMsg] = useState("" as string);

  const validateForm = () => {
    if (!formData.userName) {
      setvalidationErrorMsg(strings.errors.emptyUserName);
      return false;
    }
    if (formData.userName.length > 30) {
      setvalidationErrorMsg(strings.errors.userNameTooLong);
      return false;
    }
    const alphanumerical = regex.alphanumerical;
    if (!alphanumerical.test(formData.userName)) {
      setvalidationErrorMsg(strings.errors.userNameInvalidRegex);
      return false;
    }
    if (!formData.userEmail) {
      setvalidationErrorMsg(strings.errors.emptyUserEmail);
      return false;
    }
    if (formData.userEmail.length > 60) {
      setvalidationErrorMsg(strings.errors.userEmailTooLong);
      return false;
    }
    const email = regex.validEmail;
    if (!email.test(formData.userEmail)) {
      setvalidationErrorMsg(strings.errors.invalidEmailRegex);
      return false;
    }
    if (!formData.userPassword) {
      setvalidationErrorMsg(strings.errors.emptyPassword);
      return false;
    }
    if (formData.userPassword.length < 12) {
      setvalidationErrorMsg(strings.errors.passwordTooShort);
      return false;
    }
    if (formData.userEmail.length > 30) {
      setvalidationErrorMsg(strings.errors.passwordTooLong);
      return false;
    }
    if (formData.userEmail != formData.confirmUserEmail) {
      setvalidationErrorMsg(strings.errors.emailsDontMatch);
      return false;
    }
    if (formData.userPassword != formData.confirmUserPassword) {
      setvalidationErrorMsg(strings.errors.passwordsDontMatch);
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (validationErrorMsg) {
      setAlertContext(true, validationErrorMsg, false, (accept: boolean) => { setvalidationErrorMsg(""); });
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
        setAlertContext(true, strings.alerts.registrationSuccess);
        setFormData(new RegisterFormData());
      },
      function (error: any) {
        setAlertContext(true, error.response.data.message.result);
      });
  }

  return (
    <div>
      <br></br>
      <div className='hor-ver-center-cnt'>
        <form noValidate onSubmit={handleSubmit} id='Register__form' className='card bg-light mb-3 hor-ver-center-cnt'>
          <div>
            <h5 className='hor-ver-center-cnt'>{strings.labels.register}</h5>
            <br></br>
          </div>
          <div className='inpt-contnr hor-ver-center-cnt'>
            <div className='dflt-column hor-ver-center-cnt margin-right-10'>
              <label>
                {strings.labels.userName}:
              </label>
              <br></br>
              <label className='margin-bottom-2'>
              {strings.labels.email}:
              </label>
              <label>
                {strings.labels.confirmEmail}:
              </label>
              <br></br>
              <label className='margin-bottom-2'>
                {strings.labels.password}:
              </label>
              <label>
                {strings.labels.confirmPassword}:
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
            <button className='dflt-btn' type="submit">{strings.labels.accept}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;