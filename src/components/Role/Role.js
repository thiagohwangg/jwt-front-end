import React, { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import "./Role.scss";
const Role = () => {
  const [listChild, setListChild] = useState({
    child1: { url: "", description: "" },
  });

  const handleOnChangeInput = (name, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    setListChild(_listChild);
  };

  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };

    setListChild(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild)

  }

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3">
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
                      className="form-control"
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
                      <button className="btn btn-danger ms-2" onClick={() => handleDeleteInput(key)}>
                        <i className="fa fa-trash-o"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div>
              <button className="btn btn-warning mt-3">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
