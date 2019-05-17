import React, {useState} from 'react';
import ColumnSetup from './ColumnSetup'
import {Button} from 'react-bootstrap'

export default function App() {
    const [isColumnSetupDisplaying, setColumnSetupDisplaying] = useState(false);
    const bottonText = isColumnSetupDisplaying ? 'Hide' : 'Show';

    const onToggleColumnSetup = (e) => {
        e.stopPropagation();
        setColumnSetupDisplaying(!isColumnSetupDisplaying);
    };

    const onClose = () => {
        setColumnSetupDisplaying(false);
    };

    return (
        <div className="container">
            <div className="row p-5">
                <Button onClick={onToggleColumnSetup}>{bottonText}</Button>
                <ColumnSetup
                    isShow={isColumnSetupDisplaying}
                    onModalClose={onClose}
                />
            </div>
        </div>
    );
}
