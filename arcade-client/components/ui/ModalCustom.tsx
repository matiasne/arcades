import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Team } from "../../../domain/team";
import { TeamList } from "../team/TeamList";

interface ModalCustomProps {
  children: any;
  title: string;
  onClose: () => void;
  isOpen: boolean;
}

export const ModalCustom = ({
  title,
  children,
  onClose,
  isOpen,
}: ModalCustomProps) => {
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
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
