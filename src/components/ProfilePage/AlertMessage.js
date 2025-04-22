import React from 'react';
import { Alert } from 'antd';
const AlertMessage = ({onCloseAlert, alertMessage}) => (
  <>
   <Alert
      style={{position:"absolute" , left: "50px" , top: "50px"}}
      message="Error"
      description={alertMessage}
      type="error"
      showIcon
      closable
      onClose={e => onCloseAlert(false)}
    />

  </>
);
export default AlertMessage;