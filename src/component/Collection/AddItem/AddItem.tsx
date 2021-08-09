import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Back, Button, DropdownProps, SelectField } from "decentraland-ui";
import { Navbar } from "../../Navbar";
import { Field } from "decentraland-ui";
import {
  defaultValue,
  defaultError,
  file,
  dropdownOptions,
  NEW_ITEM,
  rarityOptation,
} from "./AddItem.data";
import { ModalSucessfull } from "../../ModalSucessfull";
import "./AddItem.css";
import { Footer } from "../../Footer";
import { WalletProvider } from "../../WalletProvider";
import { MaxFileSize } from "../../../modules/utilis";

const AddItem: React.FC = () => {
  const [itemsList, setItemsList] = useState<any>({});
  const [sucess, setSucess] = useState<boolean>(false);
  const [newItem, setNewitem] = useState<NEW_ITEM | any>(defaultValue);
  const [errorList, setErrorList] = useState<any>(defaultError);
  const { itemId } = useParams<{ itemId: string }>();
  const histrory = useHistory();
  const getItems = useSelector(
    (state: any) => state.collectionReducer.collectionList
  );
  const location = useLocation();

  useEffect(() => {
    const itemDetaild = getItems.find(
      (items: any) => items.id.toString() === itemId
    );
    setItemsList(itemDetaild);
  }, [itemId, getItems]);

  const onFieldChange = (e?: any) => {
    setErrorList({ ...errorList, [e.target.name]: false });
    setNewitem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onFileChange = (e: any) => {
    setErrorList({ ...errorList, file: false, maxSize: false });
    const file = e.target.files;
    if (file && file.length > 0) {
      const fileSize = e.target.files[0].size;
      if (fileSize < MaxFileSize) {
        setNewitem({
          ...newItem,
          file: file[0],
        });
      } else if (fileSize > MaxFileSize) {
        setErrorList({ ...errorList, maxSize: true });
        setNewitem({
          ...newItem,
          file: "",
        });
      }
    } else {
      setNewitem({
        ...newItem,
        file: "",
      });
    }
  };

  const modalSucessfull = useCallback(() => {
    setSucess(false);
    setNewitem(defaultValue);
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    let err: any = {};
    let formvalid: boolean = true;
    if (newItem.name === "") {
      err.name = true;
      formvalid = false;
    }
    if (newItem.externalLink === "") {
      err.externalLink = true;
      formvalid = false;
    }
    if (newItem.description === "") {
      err.description = true;
      formvalid = false;
    }
    if (newItem.category === "") {
      err.category = true;
      formvalid = false;
    }
    if (newItem.category === "wearable") {
      if (newItem.file === "") {
        err.file = true;
        formvalid = false;
      }
      if (newItem.rarity === "") {
        err.rarity = true;
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
      <WalletProvider>
        <div className="topbar">
          {"Mycollection "}
          <i className="fa fa-angle-right" aria-hidden="true" />{" "}
          {itemsList.name}
        </div>
        <div className="headermenu">
          <Back onClick={() => histrory.push(`/collection/${itemId}`)} />
          <label>back to {itemsList.name}</label>
          <div className="createnew">
            <h2>Create New Item</h2>
            <form onSubmit={(e) => submitForm(e)} className="field">
              <SelectField
                label="Caregory"
                placeholder="Select Item Category"
                value={newItem.category}
                options={dropdownOptions}
                error={errorList.category}
                onChange={(e: any, value: DropdownProps) =>
                  setNewitem({
                    ...newItem,
                    category: value.value,
                  })
                }
              />
              <Field
                name="name"
                label="Name"
                placeholder="Test 1-(i)"
                value={newItem.name}
                onChange={(e) => onFieldChange(e)}
                error={errorList.name}
              />
              <Field
                name="externalLink"
                label="External Link"
                placeholder=""
                value={newItem.externalLink}
                onChange={(e) => onFieldChange(e)}
                error={errorList.externalLink}
              />
              <Field
                name="description"
                label="Description"
                placeholder=""
                value={newItem.description}
                onChange={(e) => onFieldChange(e)}
                error={errorList.description}
              />

              {newItem.category === "wearable" ? (
                <>
                  <Field
                    label={file.label}
                    name={file.name}
                    type={file.type}
                    accept={file.accept}
                    onChange={(e) => onFileChange(e)}
                    error={errorList.file || errorList.maxSize}
                    message={errorList.maxSize ? "The max size 2MB" : undefined}
                  />
                  <SelectField
                    label={"How rare is this item?"}
                    placeholder={"Select a rarity"}
                    value={newItem.rarity}
                    options={rarityOptation}
                    error={errorList.rarity}
                    onChange={(e: any, value: DropdownProps) =>
                      setNewitem({
                        ...newItem,
                        rarity: value.value,
                      })
                    }
                  />
                </>
              ) : null}
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
      </WalletProvider>
      <Footer />
    </div>
  );
};

export default AddItem;
