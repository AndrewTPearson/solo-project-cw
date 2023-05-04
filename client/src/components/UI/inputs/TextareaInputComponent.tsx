import { Input } from 'antd';

const TextareaInputComponent = (props) => {

  return (

    <Input.TextArea
      id={props.id}
      name={props.name}
      autoSize={props.autoSize}
      required={props.required}
      placeholder={props.placeholder}
      onChange={props.onchange}
      disabled={props.disabled}
      maxLength={props.maxLength}
      style={{width: "100%"}}
    />

  )
}

export default TextareaInputComponent;