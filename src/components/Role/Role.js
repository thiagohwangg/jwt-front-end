import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import "./Role.scss";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";
const Role = () => {
  const dataChildDefault = { url: "", description: "", isValidUrl: true };
  const [listChild, setListChild] = useState({
    child1: dataChildDefault,
  });

  const childRef = useRef();

  const handleOnChangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;

    if (value && name === "url") {
      _listChild[key]["isValidUrl"] = true;
    }
    setListChild(_listChild);
  };

  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = dataChildDefault;
    setListChild(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };

  const buildDataToPersist = () => {
    let _listChild = _.cloneDeep(listChild);
    let result = [];
    Object.entries(listChild).find(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChild).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      // call api
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res?.EC === 0) {
        toast.success(res?.EM);
        childRef.current.fetchListRolesAgain();
      }
    } else {
      //err
      toast.error("Input URL must not be empty..");
      let _listChild = _.cloneDeep(listChild);
      const key = invalidObj[0];
      _listChild[key]["isValidUrl"] = false;
      setListChild(_listChild);
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="adding-roles mt-3">
          <div className="title-role">
            <h4>Add a new role...</h4>
          </div>
          <div className="role-parent">
            {Object.entries(listChild).map(([key, child], index) => {
              return (
                <div className={`row role-child ${key}`} key={`child-${key}`}>
                  <div className="col-5 form-group">
                    <label>URL:</label>
                    <input
                      onChange={(e) =>
                        handleOnChangeInput("url", e.target.value, key)
                      }
                      type="text"
                      className={`form-control ${
                        child.isValidUrl ? "" : "is-invalid"
                      }`}
                      value={child.url}
                    />
                  </div>
                  <div className="col-5 form-group">
                    <label>Description:</label>
                    <input
                      onChange={(e) =>
                        handleOnChangeInput("description", e.target.value, key)
                      }
                      type="text"
                      className="form-control"
                      value={child.description}
                    />
                  </div>
                  <div className="col-2 mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={handleAddNewInput}
                    >
                      <i className="fa fa-plus-circle"></i>
                    </button>
                    {index >= 1 && (
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDeleteInput(key)}
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div>
              <button className="btn btn-warning mt-3" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3 table-role">
          <h4>List Currents Roles</h4>
        <TableRole ref={childRef} />
        </div>
      </div>
    </div>
  );
};

export default Role;
