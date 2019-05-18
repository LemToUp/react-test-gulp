import React, {useState, useEffect} from 'react';
import ColumnSetup from './ColumnSetup';
import {Button} from 'react-bootstrap';
import availableColumnsData from '../data/columns.json';
import visibleColumnDatas from '../data/visibleColumns.json';

export default function App() {
    const [isColumnSetupDisplaying, setColumnSetupDisplaying] = useState(false);
    const [availableColumns, setAvailableColumns] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [fixedColumns, setfixedColumns] = useState([]);
    const bottonText = isColumnSetupDisplaying ? 'Hide' : 'Show';

    useEffect(
        () => {
            setAvailableColumns(availableColumnsData);
            setVisibleColumns(visibleColumnDatas);
        },
        [],
    );

    const onToggleColumnSetup = (e) => {
        e ? e.stopPropagation() : null;
        setColumnSetupDisplaying(!isColumnSetupDisplaying);
    };

    const onClose = () => {
        setColumnSetupDisplaying(false);
    };

    return (
        <div className="container">
            <div className="row p-5">
                <Button onClick={onToggleColumnSetup}>{bottonText}</Button>
                {isColumnSetupDisplaying ? <ColumnSetup
                    isShow={true}
                    onModalClose={onClose}
                    availableColumns={availableColumns}
                    visibleColumns={visibleColumns}
                    fixedColumns={fixedColumns}
                /> : null} {/*State will be lost on close*/}
            </div>
        </div>
    );
}
