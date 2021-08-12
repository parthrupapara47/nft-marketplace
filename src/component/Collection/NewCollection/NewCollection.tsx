import React, { useState, useEffect, useCallback } from "react";
import {
  addNewCollection,
  updateCollection,
} from "../../../modules/action/collection";
import { useDispatch } from "react-redux";
import { Modal, Field, Button } from "decentraland-ui";
import { ModalSucessfull } from "../../ModalSucessfull";
import { form, errorForm, FORM } from "./NewCollection.data";
import "./NewCollection.css";
import { MaxFileSize } from "../../../modules/utilis";

type Props = {
  modal: boolean;
  setModal: any;
  collection?: FORM;
};

const NewCollection: React.FC<Props> = (props: Props) => {
  const { modal, setModal, collection } = props;
  const [open, setOpen] = useState(false);
  const [sucessfull, setSucessfull] = useState(false);
  const [collectionDetails, setcollectionDetails] = useState<FORM | any>(form);
  const [formError, setFormError] = useState<any>(errorForm);
  const [sucessMessage, setSucessMessage] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  useEffect(() => {
    collection && setcollectionDetails(collection);
  }, [collection]);

  const modalSucessfull = useCallback(() => {
    setSucessfull(false);
    !collection && setcollectionDetails(form);
  }, []);

  const closeModal = () => {
    setModal();
    setFormError(errorForm);
    !collection && setcollectionDetails(form);
  };

  const onFieldChange = (e?: any) => {
    setFormError({ ...formError, [e.target.name]: false });
    setcollectionDetails({
      ...collectionDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onImageChange = (e: any) => {
    setFormError({ ...formError, image: false });
    const file = e.target.files;
    if (file && file.length > 0 && file[0].type.includes("image")) {
      const fileSize = e.target.files[0]?.size;
      if (fileSize < MaxFileSize) {
        setFormError({ ...formError, maxSize: false });
        var reader = new FileReader();
        var url = reader.readAsDataURL(file[0]);

        reader.onloadend = function (e: any) {
          setcollectionDetails({
            ...collectionDetails,
            image: reader.result,
          });
        };
      } else if (fileSize > MaxFileSize) {
        setFormError({ ...formError, maxSize: true });
        setcollectionDetails({
          ...collectionDetails,
          image: "",
        });
      }
    } else {
      setFormError({ ...formError, maxSize: false });
      setcollectionDetails({
        ...collectionDetails,
        image: "",
      });
    }
  };

  const submitForm = () => {
    let err: any = {};
    let formvalid = true;
    for (var key in collectionDetails) {
      if (collectionDetails[key] === "") {
        err[key] = true;
        formvalid = false;
      }
    }
    setFormError(err);
    if (formvalid && !collection) {
      setSucessMessage(`${collectionDetails.name} added sucessfully`);
    }
    if (formvalid && collection) {
      setSucessMessage(`${collectionDetails.name} updated sucessfully`);
    }
    if (formvalid) {
      setSucessfull(true);
      dispatch(updateCollection(collectionDetails));
      setModal();
    }
  };

  return (
    <>
      <Modal size="small" open={open}>
        <Modal.Header>New Collection</Modal.Header>
        <Modal.Content>
          <Field
            label="Name"
            placeholder="Test 1-(i)"
            name="name"
            required={collectionDetails.name !== "" ? null : null}
            value={collectionDetails.name}
            onChange={(e) => onFieldChange(e)}
            error={formError.name}
          />
          <Field
            label="Description"
            placeholder=""
            name="description"
            required={collectionDetails.description !== "" ? null : null}
            value={collectionDetails.description}
            onChange={(e) => onFieldChange(e)}
            error={formError.description}
          />
          <Field
            label="Logo Image"
            placeholder=""
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => onImageChange(e)}
            error={formError.image || formError.maxSiz}
            message={formError.maxSize ? "The max size 2MB" : undefined}
          />
          {collectionDetails.image !== null ? (
            <img src={collectionDetails.image} className="imagepreview" />
          ) : null}
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
          message={sucessMessage}
        />
      ) : null}
    </>
  );
};

export default React.memo(NewCollection);
