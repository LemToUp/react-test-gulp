import React from 'react';
import {Modal, Button} from 'react-bootstrap'

export default function ColumnSetup(props) {

    const close = (e) => {
        if (e) {
            e.stopPropagation();
        }

        if (props.onModalClose) {
            props.onModalClose();
        }
    };

    return (
        <Modal show={props.isShow} onHide={close} className='column-setup-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {}}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}