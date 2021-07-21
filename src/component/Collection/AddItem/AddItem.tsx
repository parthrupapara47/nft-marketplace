import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Back, Button } from "decentraland-ui";
import { Navbar } from "../../Navbar";
import { Field } from "decentraland-ui";
import { itemField, defaultValue, defaultError, file } from "./AddItem.data";
import { ModalSucessfull } from "../../ModalSucessfull";
import "./AddItem.css";
import { Footer } from "../../Footer";

const AddItem: React.FC = () => {
  const [itemsList, setItemsList] = useState<any>({});
  const [sucess, setSucess] = useState<boolean>(false);
  const [newItem, setNewitem] = useState<any>(defaultValue);
  const [errorList, setErrorList] = useState<any>(defaultError);
  const { itemId } = useParams<{ itemId: string }>();
  const histrory = useHistory();
  const getItems = useSelector(
    (state: any) => state.collectionReducer.collectionList
  );

  useEffect(() => {
    const itemDetaild = getItems.find(
      (items: any) => items.id.toString() === itemId
    );
    setItemsList(itemDetaild);
  }, [itemId, getItems]);

  const onFieldChange = (e?: any) => {
    setErrorList({ ...errorList, [e.target.name]: false });
    if (e.target.name === file.name) {
      setNewitem({
        ...newItem,
        file: e.target.files[0],
      });
      return;
    }
    setNewitem({ ...newItem, [e.target.name]: e.target.value });
  };

  const modalSucessfull = useCallback(() => {
    setSucess(false);
    setNewitem(defaultValue);
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    let err: any = {};
    let formvalid: boolean = true;
    for (var key in newItem) {
      if (newItem[key] === "") {
        err[key] = true;
        formvalid = false;
      }
    }
    setErrorList(err);
    if (formvalid) {
      setSucess(true);
    }
  };

  return (
    <div className="additem">
      <Navbar />
      <div className="headermenu">
        <Back onClick={() => histrory.push(`/collection/${itemId}`)} />
        <label>back to {itemsList.name}</label>
        <div className="createnew">
          <h2>Create New Item</h2>
          <form onSubmit={(e) => submitForm(e)} className="field">
            {itemField.map((item: any, index) => (
              <Field
                key={index}
                {...item}
                value={newItem[item.name]}
                onChange={(e) => onFieldChange(e)}
                error={errorList[item.name]}
              />
            ))}
            <Field
              label={file.label}
              name={file.name}
              type={file.type}
              accept={file.accept}
              onChange={(e) => onFieldChange(e)}
              error={errorList.file}
            />
            {/* <img src={newItem.file} /> */}
            <Button type="submit" primary onClick={(e) => submitForm(e)}>
              Create
            </Button>
          </form>
        </div>
      </div>
      {sucess ? (
        <ModalSucessfull
          modal={sucess}
          setModal={modalSucessfull}
          message={`${newItem.name} added sucessfully to ${itemsList.name}`}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default AddItem;
