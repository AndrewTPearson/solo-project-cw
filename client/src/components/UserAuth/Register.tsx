import InputComponent from "../UI/inputs/InputComponent";
import { Form, Button} from "antd";
import { useState } from "react";
import { registerUser } from "../../services/user_service";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('')
  const [userAge, setUserAge] = useState(14)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formIsValid, setFormIsValid] = useState(false)


  function handleInputChange (e) {
    const input = e.target.name;
    console.log(input)
    if(input === 'username') setUsername(e.target.value)
    if(input === 'userAge') setUserAge(e.target.value)
    if(input === 'password') {
      setPassword(e.target.value)
    }
    if(input === 'confirmPassword') setConfirmPassword(e.target.value)

    if(username !== '' && password !== '' && confirmPassword !== ''){
      setFormIsValid(true)
    }else {
      setFormIsValid(false)
    }
  }


    function handleFormSubmit (e) {
    //e.preventDefault();
    registerUser(username, userAge ,password)
    .then((data) => {
    })
    return false;
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
              placeholder: "Choose a username",
              onchange: handleInputChange
            }}
          />
        </Form.Item>
        <Form.Item name="userAge" label="Age">
          <InputComponent
            props={{
              id: "userAge",
              name: "userAge",
              type: "number",
              autoComplete: "user age",
              required: true,
              placeholder: "Enter your age",
              //TODO: add min-max age
              onchange: handleInputChange
            }}
           />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <InputComponent
            props={{
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "password",
              required: true,
              placeholder: "Enter a password",
              //TODO: add min-max age
              onchange: handleInputChange
            }}
            />
        </Form.Item>
        <Form.Item label="Confirm password" name="confirmPassword">
          <InputComponent 
            props={{
              id: "confirmPassword",
              name: "confirmPassword",
              type: "password",
              autoComplete: "confirm-password",
              required: true,
              placeholder: "confirm your password",
              onChange: handleInputChange
            }}
            />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            SignIn
          </Button>
        </Form.Item>
      </Form>
      <Link to="/login"></Link>
    </div>
  )
}

export default Register;