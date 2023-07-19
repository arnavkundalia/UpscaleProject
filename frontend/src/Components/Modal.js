import React, { Component, useState } from "react";

// importing all of these classes from reactstrap module
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

// build a class base component
const DeletingModal = (itemToDelete, deletingPermission, deletingFunc) => {
// constructor(props) {
// 	super(props);
// 	this.state = {
// 	activeItem: this.props.activeItem
// 	};
// }

// changes handler to check if a checkbox is checked or not
    // const handleChange = e => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     if (e.target.type === "checkbox") {
    //     value = e.target.checked;
    //     }
    //     const eventActiveItem = itemActive;
    //     eventActiveItem[name] =  value;
    //     setItemActive(eventActiveItem);
    // };

// rendering modal in the custommodal class received toggle and on save as props,

    // const { toggle, onSave } = this.props;
    return (
    <Modal isOpen={true} style={{opacity:1}}>
        <ModalHeader> Delete confirmation </ModalHeader>
        <ModalBody>
            Are you sure you want to delete {itemToDelete.input_image.split("/")[5]} ?
        </ModalBody>
        <ModalFooter>
        <Button color="danger" onClick={() => deletingFunc(itemToDelete)}>
            Confirm
        </Button>
        <Button color="success" onClick={() => deletingPermission(false)}>
            Cancel
        </Button>
        </ModalFooter>
    </Modal>
    );

};
export default DeletingModal
