import React, {useState, useEffect} from 'react';
import ColumnSetup from './ColumnSetup';
import {Button} from 'react-bootstrap';
import columnsData from '../data/columns.json';
import visibleColumnDatas from '../data/visibleColumns.json';

export default function App() {
    const [isColumnSetupDisplaying, setColumnSetupDisplaying] = useState(false);
    const [columns, setColumns] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [fixedIndex, setFixedIndex] = useState(undefined);
    const bottonText = isColumnSetupDisplaying ? 'Hide' : 'Show';

    useEffect(
        () => {
            setColumns(columnsData);
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

    const onGetData = (data) => {
        console.log('Column Setup Component data:');
        console.log(data);
    };

    return (
        <div className="container">
            <div className="row p-5">
                <Button onClick={onToggleColumnSetup}>{bottonText}</Button>
                {isColumnSetupDisplaying ? <ColumnSetup
                    isShow={true}
                    onModalClose={onClose}
                    onSave={onGetData}
                    columns={columns}
                    visibleColumns={visibleColumns}
                    fixedIndex={fixedIndex}
                /> : null} {/*State will be lost on close*/}
            </div>
        </div>
    );
}
