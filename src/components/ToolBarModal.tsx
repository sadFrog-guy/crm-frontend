import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import React from "react";

interface ToolBarModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  title: string;
  onConfirm?: () => void;
  onDiscard?: () => void;
  isLoading: boolean;
  scrollBehavior?: "inside" | "outside";
  isConfirmDisabled?: boolean;
  showButtons?: boolean;
}

function plugFunction() {
  return 0;
}

export default function ToolBarModal({
  isOpen,
  onOpenChange,
  onOpen,
  children,
  title,
  onConfirm = plugFunction,
  onDiscard = plugFunction,
  isLoading,
  scrollBehavior = "inside",
  isConfirmDisabled = false,
  showButtons = true,
}: ToolBarModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior={scrollBehavior}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {showButtons ? (
                <>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onDiscard();
                      onClose();
                    }}
                  >
                    Отменить
                  </Button>
                  <Button
                    color="primary"
                    isDisabled={isConfirmDisabled}
                    isLoading={isLoading}
                    onPress={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    Подтвердить
                  </Button>
                </>
              ) : (
                ""
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
