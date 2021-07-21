import React, { useState, useEffect, useCallback } from "react";
import { addNewCollection } from "../../../modules/action/collection";
import { useDispatch } from "react-redux";
import { Modal, Field, Button } from "decentraland-ui";
import { ModalSucessfull } from "../../ModalSucessfull";
import { form, itemField, errorForm } from "./NewCollection.data";
import "./NewCollection.css";

type Props = {
  modal: boolean;
  setModal?: any;
};

const NewCollection: React.FC<Props> = (props: Props) => {
  const { modal, setModal } = props;
  const [open, setOpen] = useState(false);
  const [sucessfull, setSucessfull] = useState(false);
  const [newcollection, setnewCollection] = useState<any>(form);
  const [formError, setFormError] = useState<any>(errorForm);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  const modalSucessfull = useCallback(() => {
    setSucessfull(false);
    setnewCollection(form);
  }, []);

  const closeModal = () => {
    setModal();
    setFormError(errorForm);
    setnewCollection(form);
  };

  const onFieldChange = (e?: any) => {
    setFormError({ ...formError, [e.target.name]: false });
    if (e.target.name === "file") {
      setnewCollection({ ...newcollection, file: e.target.files[0] });
      return;
    }
    setnewCollection({ ...newcollection, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    let err: any = {};
    let formvalid = true;
    for (var key in newcollection) {
      if (newcollection[key] === "") {
        err[key] = true;
        formvalid = false;
      }
    }
    setFormError(err);
    if (formvalid) {
      setSucessfull(true);
      dispatch(addNewCollection(newcollection));
      setModal();
    }
  };

  return (
    <>
      <Modal size="small" open={open}>
        <Modal.Header>New Collection</Modal.Header>
        <Modal.Content>
          {itemField.map((field, index) => (
            <Field
              key={index}
              {...field}
              required={newcollection[field.name] !== "" ? null : null}
              value={newcollection[field.name]}
              onChange={(e) => onFieldChange(e)}
              error={formError[field.name]}
            />
          ))}
          <Field
            label="Upload file"
            placeholder=""
            name="file"
            type="file"
            accept=".imge, .jpeg, .jpg, .png,"
            onChange={(e) => onFieldChange(e)}
            error={formError.file}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => submitForm()}>
            Submit
          </Button>
          <Button onClick={() => closeModal()}>Cancel</Button>
        </Modal.Actions>
      </Modal>
      {sucessfull ? (
        <ModalSucessfull
          modal={sucessfull}
          setModal={modalSucessfull}
          message={`${newcollection.name} added sucessfully`}
        />
      ) : null}
    </>
  );
};

export default React.memo(NewCollection);
