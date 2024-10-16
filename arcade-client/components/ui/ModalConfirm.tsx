import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Team } from "../../../domain/team";
import { TeamList } from "../team/TeamList";
import { PrimaryButton } from "./ButtonPrimary";

interface ModalConfirmProps {
  text: string;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

export const ModalConfirm = ({
  title,
  text,
  onConfirm,
  onClose,
  isOpen,
}: ModalConfirmProps) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bg="bgSecondary">
        <ModalHeader>
          <h1>{title}</h1>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{text}</p>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={() => onClose()}>
            No
          </Button>
          <PrimaryButton
            onClick={() => {
              onClose();
              onConfirm();
            }}
            size="md"
          >
            Yes
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
