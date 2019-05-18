import React, {useState, useEffect} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import AvailableDDArea from './AvailableDDArea';
import VisibleDDArea from './VisibleDDArea';

export default function ColumnSetup(props) {
    const [availableColumnsTemp, setAvailableColumnsTemp] = useState([]);
    const [visibleColumnsTemp, setVisibleColumnsTemp] = useState([]);
    const [fixedColumnsTemp, setfixedColumnsTemp] = useState([]);

    useEffect(
        () => {
            setAvailableColumnsTemp(props.availableColumns || []);
            setVisibleColumnsTemp(props.visibleColumns || []);
            setfixedColumnsTemp(props.fixedColumns || []);
        },
        [],
    );

    /*useEffect( //Some bussiness logic on props changing event (is not required at this task)
        () => {

        },
        [props.availableColumns, props.visibleColumns, props.fixedColumns],
    );*/

    const close = (e) => {
        e ? e.stopPropagation() : null;
        props.onModalClose ? props.onModalClose() : null;
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
                        <Col xs={6} className='drag-list left-column'>
                            <span>Available</span>
                            <AvailableDDArea
                                items={props.availableColumns}
                            />
                        </Col>
                        <Col xs={6} className='drag-list right-column'>
                            <span>Visible</span>
                            <VisibleDDArea
                                items={props.visibleColumns}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {}}>
                    Save
                </Button>
                <Button variant="secondary" onClick={close}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}