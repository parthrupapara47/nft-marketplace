import React, { useState, useEffect } from "react";
import { Modal, Close } from "decentraland-ui";
import "./ModalSucessfull.css";

type Props = {
  modal: boolean;
  setModal?: any;
  message: string;
};
const ModalSucessfull: React.FC<Props> = (props: Props) => {
  const { modal, setModal, message } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  return (
    <div>
      <Modal
        size="small"
        open={open}
        closeIcon={<Close />}
        onClose={() => setModal()}
      >
        <Modal.Header>{message}</Modal.Header>
      </Modal>
    </div>
  );
};

export default React.memo(ModalSucessfull);
