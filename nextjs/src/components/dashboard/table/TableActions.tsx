"use client";

import React, { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import Link from 'next/link';
import { VerticalDotsIcon } from '../temp/VerticalDotsIcon';

interface TableActionsProps {
  viewAction?: any;
  editAction?: any;
  onDelete?: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  viewAction,
  editAction,
  onDelete
}) => {
  const [visible, setVisible] = useState(false); // state to control modal visibility  

  const handleDeleteClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setVisible(false); // hide the modal after confirmation  
  };

  return (
    <>
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown className="bg-background border-1 border-default-200">
          <DropdownTrigger>
            <Button isIconOnly radius="full" size="sm" variant="light">
              <VerticalDotsIcon className="text-default-400" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {viewAction && (
              <DropdownItem>
                <Link color="foreground" href={viewAction}>
                  View
                </Link>
              </DropdownItem>
            )}
            {editAction && (
              <DropdownItem>
                <Link color="foreground" href={editAction}>
                  Edit
                </Link>
              </DropdownItem>
            )}
            {onDelete && (
              <DropdownItem color="danger" onClick={handleDeleteClick}>
                Delete
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal backdrop={'blur'} isOpen={visible} onClose={handleClose}>
        <ModalContent>
          <ModalHeader className="text-default-500">Delete Confirmation</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this item? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="shadow" color="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableActions;