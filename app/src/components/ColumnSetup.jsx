import React, {useState, useEffect} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import AvailableDDArea from './AvailableDDArea';
import VisibleDDArea from './VisibleDDArea';
import {DragDropContext} from 'react-beautiful-dnd';

export const TYPE_AVAILABLE = 'TYPE_AVAILABLE';
export const TYPE_VISIBLE = 'TYPE_VISIBLE';

export default function ColumnSetup(props) {
    const [availableColumnsTemp, setAvailableColumnsTemp] = useState([]);
    const [visibleColumnsTemp, setVisibleColumnsTemp] = useState([]);
    const [indexOfFixedRow, setIndexOfFixedRow] = useState(-1); //All above items are fixed

    useEffect(
        () => {
            const columns = props.columns || [];
            const visibleColumns =  props.visibleColumns || [];
            setAvailableColumnsTemp(calculateAvailableColumns(columns, visibleColumns));
            setVisibleColumnsTemp(visibleColumns);
            setIndexOfFixedRow(props.fixedIndex || -1);
        },
        [],
    );

    /*useEffect( //Some bussiness logic on props changing event (is not required at this task)
        () => {

        },
        [props.availableColumns, props.visibleColumns, props.fixedColumns],
    );*/

    const calculateAvailableColumns = (columns = [], visibleColumns = []) => {
        return columns.filter(column => visibleColumns.indexOf(column.id) === -1);
    };

    const close = (e) => {
        e ? e.stopPropagation() : null;
        props.onModalClose ? props.onModalClose() : null;
    };

    const onDragEnd = (result) => {

        const { source, destination } = result;

        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) { //Inside of a one D&D area
            switch (source.droppableId) {
                case (TYPE_AVAILABLE):
                    setAvailableColumnsTemp(reorder(availableColumnsTemp, source.index, destination.index));
                    break;
                case (TYPE_VISIBLE):
                    if (isNotFixedAreaCheck(destination.index, indexOfFixedRow)) {
                        setVisibleColumnsTemp(reorder(visibleColumnsTemp, source.index, destination.index));
                    }
                    break;
                default:
            }
        } else { //Between of a different D&D areas
            if (source.droppableId === TYPE_AVAILABLE && destination.droppableId === TYPE_VISIBLE) {
                if (isNotFixedAreaCheck(destination.index, indexOfFixedRow)) {
                    replaceFromAvailableToVisible(source.index, destination.index);
                }
            } else if (source.droppableId === TYPE_VISIBLE && destination.droppableId === TYPE_AVAILABLE) {
                replaceFromVisibleToAvailable(source.index, destination.index);
            }
        }
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const replaceFromAvailableToVisible = (fromAvailableIndex, toVisibleIndex) => {
        const availablesList = Array.from(availableColumnsTemp);
        const [removed] = availablesList.splice(fromAvailableIndex, 1);
        setAvailableColumnsTemp(availablesList);
        if (removed) {
            const visiblesList = Array.from(visibleColumnsTemp);
            visiblesList.splice(toVisibleIndex, 0, removed.id);
            setVisibleColumnsTemp(visiblesList)
        }
    };

    const replaceFromVisibleToAvailable = (fromVisibleIndex, toAvailableIndex) => {
        const visiblesList = Array.from(visibleColumnsTemp);
        const [removedId] = visiblesList.splice(fromVisibleIndex, 1);
        setVisibleColumnsTemp(visiblesList);
        if (removedId && props.columns) {
            const removedObject = props.columns.filter(column => column.id === removedId);
            if (removedObject && removedObject[0]) {
                const availablesList = Array.from(availableColumnsTemp);
                availablesList.splice(toAvailableIndex, 0, removedObject[0]);
                setAvailableColumnsTemp(availablesList);
            }
        }
    };

    const setFixedIndex = (index = null) => {
        setIndexOfFixedRow(index);
    };

    const isNotFixedAreaCheck = (targetIndex, fixedIndex) => {
        return targetIndex > fixedIndex;
    };

    const save = () => {
       if (props.onSave) {
           const data = {
               visibleIds: visibleColumnsTemp.filter((column, index) => isNotFixedAreaCheck(index, indexOfFixedRow)),
               numberOfFixedColums: visibleColumnsTemp.filter((column, index) => !isNotFixedAreaCheck(index, indexOfFixedRow)).length,
           };
           props.onSave(data);
       }
    };

    return (
        <Modal
            show={props.isShow}
            onHide={close}
            className='column-setup-modal'
            backdrop={'static'}
        >
            <Modal.Header closeButton>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h5>Configure Data Fields</h5>
                            <p>Drag & drop between columns to configure visible data.</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Col xs={6} className='drag-list left-column'>
                                <span>Available</span>
                                <AvailableDDArea
                                    items={availableColumnsTemp}
                                    draggableId={TYPE_AVAILABLE}
                                />
                            </Col>
                            <Col xs={6} className='drag-list right-column'>
                                <span>Visible</span>
                                <VisibleDDArea
                                    allItems={props.columns}
                                    visibleItemsIds={visibleColumnsTemp}
                                    draggableId={TYPE_VISIBLE}
                                    fixedIndex={indexOfFixedRow}
                                    onGetFixedIndex={setFixedIndex}
                                />
                            </Col>
                        </DragDropContext>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={save}>
                    Save
                </Button>
                <Button variant="secondary" onClick={close}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}