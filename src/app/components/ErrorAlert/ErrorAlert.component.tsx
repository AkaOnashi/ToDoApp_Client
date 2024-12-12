import React from 'react';
import { Alert } from 'antd';
import './ErrorAlert.styles.scss';
interface ErrorAlertProps {
    errorMessage: string;
}
const ErrorAlert: React.FC<ErrorAlertProps> = ({errorMessage}) => (
    <div className="error-alert-box">
        <Alert
        message="Error"
        description={errorMessage}
        type="error"
        showIcon
        />
    </div>
);

export default ErrorAlert;