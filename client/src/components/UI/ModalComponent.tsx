import { Modal } from "antd";
import { useState } from "react";

const ModalComponent = ({props, children}) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  return (
    <>
      <Modal
        open={props.open}
        confirmLoading={confirmLoading}
        // onOk={handleOk}
        onCancel={props.close}
        style={{margin: "4.5vw", padding: 0, minHeight: "50vh"}}
        footer={null}
        width="auto"
        closable={false}
      >
        <div>{children}</div>

      </Modal>
    </>
  );
}

export default ModalComponent