import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Back,
  Button,
  DropdownProps,
  Header,
  Row,
  Section,
  SelectField,
} from "decentraland-ui";
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
import { BodyShapeType } from "../../../modules/nft/types";

const AddItem: React.FC = () => {
  const [itemsList, setItemsList] = useState<any>({});
  const [sucess, setSucess] = useState<boolean>(false);
  const [newItem, setNewitem] = useState<NEW_ITEM | any>(defaultValue);
  const [filesizeError, setFilesizeError] = useState<boolean>(false);
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
    setNewitem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onFileChange = (e: any) => {
    setFilesizeError(false);
    const file = e.target.files;
    if (file && file.length > 0) {
      const fileSize = e.target.files[0].size;
      if (fileSize < MaxFileSize) {
        setNewitem({
          ...newItem,
          file: file[0],
        });
      } else if (fileSize > MaxFileSize) {
        setFilesizeError(true);
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

  const renderRepresentation = (type: BodyShapeType) => {
    const { bodyShape } = newItem;
    return (
      <div
        className={`option has-icon ${type} ${
          type === bodyShape ? "active" : ""
        }`.trim()}
        onClick={() =>
          setNewitem({
            ...newItem,
            bodyShape: type,
          })
        }
      >
        {type}
      </div>
    );
  };

  const modalSucessfull = useCallback(() => {
    setSucess(false);
    setNewitem(defaultValue);
  }, []);

  const valid = () => {
    const { name, externalLink, description, file, rarity, bodyShape } =
      newItem;

    const required = [name, externalLink, description, file, rarity, bodyShape];

    return required.every((field) => field !== "");
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (valid()) {
      setSucess(true);
    }
  };

  return (
    <div className="additem CreateItemModal">
      <Navbar />
      <WalletProvider>
        <div className="topbar">
          {"Mycollection "}
          <i className="fa fa-angle-right" aria-hidden="true" />{" "}
          {itemsList.name}
        </div>
        <div className="headermenu">
          <Back onClick={() => histrory.push(`/collection/${itemId}`)} />
          <label>
            {"back to"} {itemsList.name}
          </label>
          <div className="createnew">
            <h2>{"Create New Item"}</h2>
            <form onSubmit={(e) => submitForm(e)} className="field">
              <Field
                name="name"
                label="Name"
                placeholder="Test 1-(i)"
                value={newItem.name}
                onChange={(e) => onFieldChange(e)}
              />
              <Field
                name="externalLink"
                label="External Link"
                placeholder=""
                value={newItem.externalLink}
                onChange={(e) => onFieldChange(e)}
              />
              <Field
                name="description"
                label="Description"
                placeholder=""
                value={newItem.description}
                onChange={(e) => onFieldChange(e)}
              />

              <Field
                label={file.label}
                name={file.name}
                type={file.type}
                accept={file.accept}
                onChange={(e) => onFileChange(e)}
                error={filesizeError}
                message={filesizeError ? "The max size 2MB" : undefined}
              />
              <Section>
                <Header sub>{"Select the body shape for your item"}</Header>
                <Row>
                  {renderRepresentation(BodyShapeType.BOTH)}
                  {renderRepresentation(BodyShapeType.MALE)}
                  {renderRepresentation(BodyShapeType.FEMALE)}
                </Row>
              </Section>
              <SelectField
                label={"How rare is this item?"}
                placeholder={"Select a rarity"}
                value={newItem.rarity}
                options={rarityOptation}
                onChange={(e: any, value: DropdownProps) =>
                  setNewitem({
                    ...newItem,
                    rarity: value.value,
                  })
                }
              />
              <Button
                type="submit"
                primary
                onClick={(e) => submitForm(e)}
                disabled={!valid()}
              >
                {"Create"}
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
