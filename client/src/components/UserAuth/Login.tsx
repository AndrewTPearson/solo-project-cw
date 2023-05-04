import { useContext } from "react";
import Context from "../context/context";
import InputComponent from "../UI/inputs/InputComponent";
import { Form, Button} from "antd";
import { useState } from "react";
import * as UserService from "../../services/user_service";
import * as ActiveUserService from "../../services/active_user_service";
import './Auth.css';
import { Link } from "react-router-dom";
import NavigationContext from "../context/navigationContext";

const Login = () => {
  const {navigate} = useContext(NavigationContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formIsValid, setFormIsValid] = useState(false)

  function handleInputChange (e) {
    const input = e.target.name;
    if(input === 'username') setUsername(e.target.value)
    if(input === 'password') setPassword(e.target.value)
    if(username !== '' && password !== ''){
      setFormIsValid(true)
    }else {
      setFormIsValid(false)
    }
  }

  const handleFormSubmit = async() => {
    const res = await UserService.loginUser(username, password);
    // await ActiveUserService.setActiveUser(res[0]);
    navigate('/');
  }

  return (
    <div className="auth-wrapper">
      <img className="logo" src="/imin-logo-text.png" alt="logo-text" />
      <Form
        name="control-ref"
        onFinish={handleFormSubmit}
        >
       <Form.Item name="username" label="username">
          <InputComponent
            props={{
              id: "username",
              name: "username",
              type: "text",
              autoComplete: "username",
              required: true,
              placeholder: "Enter your username",
              onchange: handleInputChange
            }}
            />
        </Form.Item>
        <input name="chrome-autofill-dummy1" style={{display:'none'}} disabled/>

        <Form.Item name="password" label="password">
          <InputComponent
            props={{
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "password",
              required: true,
              placeholder: "Enter your password",
              onchange: handleInputChange
            }}
            />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Link to='/register'>Create an account</Link>
    </div>
  )
}

export default Login;