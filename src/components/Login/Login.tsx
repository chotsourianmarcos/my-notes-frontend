import './Login.css';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AlertContext } from '../../contexts/AlertContext';
import { UserContext } from '../../contexts/UserContext';
import UserHandler from '../../handlers/userHandler';
import LoginFormData from '../../models/forms/loginFormData';
import { useNavigate } from 'react-router-dom';
import { routes, values } from '../../constants/values';


function Login() {
  const { strings } = useContext(LanguageContext);
  const { setAlertContext } = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const [formData, setFormData] = useState(new LoginFormData());
  const [validationErrorMsg, setvalidationErrorMsg] = useState("" as string);

  useEffect(() => {
    if (validationErrorMsg) {
      setAlertContext(true, validationErrorMsg, false, (accept: boolean) =>{ setvalidationErrorMsg(""); });
    }
  }, [validationErrorMsg]);

  const userHandler = new UserHandler(userContext);
  const navigate = useNavigate();
  
  const validateForm = () => {
    if (!formData.userName || !formData.userEmail || !formData.userPassword) {
      setvalidationErrorMsg(strings.errors.emptyFields);
      return false;
    }
    return true;
  }
  
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values: any) => ({ ...values, [name]: value }));
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();

    if(!validateForm()){
      return false;
    }

    userHandler.login(formData).then(
      function (value) {
        userContext.setLogActive(true);
        userContext.setUserData(value);
        navigate(routes.notes)
      },
      function (error) {
        let errorMessage = error.response.data.ReasonPhrase;
        if(errorMessage.includes(values.userNotFoundPhrase)){
          errorMessage = strings.textContent.userNotFoundErrorMessage;
        }else if(errorMessage.includes(values.userWrongCredentials)){
          errorMessage = strings.textContent.userWrongCredentialsErrorMessage;
        }
        setAlertContext(true, errorMessage, false, (accept: boolean) => { });
      });
  }

  return (
    <div>
      <br></br>
      <div className='hor-ver-center-cnt'>
        <form noValidate onSubmit={handleSubmit} id='Login__form' className='card bg-light mb-3 hor-ver-center-cnt'>
          <div>
            <h5 className='hor-ver-center-cnt'>{strings.labels.login}</h5>
            <br></br>
          </div>
          <div className='inpt-contnr hor-ver-center-cnt'>
            <div className='dflt-column hor-ver-center-cnt margin-right-10'>
              <label>
                {strings.labels.userName}:
              </label>
              <br></br>
              <label>
                {strings.labels.email}:
              </label>
              <br></br>
              <label>
                {strings.labels.password}:
              </label>
            </div>
            <div className='dflt-column hor-ver-center-cnt'>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
              <br></br>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
              />
              <br></br>
              <input
                autoComplete="off"
                type="password"
                name="userPassword"
                value={formData.userPassword}
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

export default Login;