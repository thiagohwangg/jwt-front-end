import { Button, Modal } from "react-bootstrap";
import { fetchGroup, createNewUser } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = ({ title, show, onHide }) => {
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const validInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validInputDefault);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let response = await fetchGroup();
    if (response?.data.EC === 0) {
      setUserGroups(response.data.DT);
      if (response?.data.DT) {
        let group = response.data.DT;
        setUserData({ ...userData, group: group[0]?.id });
      }
    } else {
      toast.error(response.data.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    // create user
    setValidInputs(validInputDefault);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        return check;
      }
      return check;
    }
  };

  const handleConfirmUser = async () => {
    // create user
    let check = checkValidateInputs();
    if (check) {
      let response = await createNewUser({
        ...userData,
        groupId: userData["group"],
      });
      if (response.data.EC === 0) {
        onHide()
        setUserData({ ...defaultUserData, group: userGroups[0]?.id });
      } else {
        toast.error("Error create user");
      }
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={onHide}
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span>{title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body">
            <div className="row">
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Email address (<span className="red">*</span>) :
                </label>
                <input
                  value={userData.email}
                  type="email"
                  className={
                    validInputs.email
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  onChange={(e) => handleOnChangeInput(e.target.value, "email")}
                />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Phone number (<span className="red">*</span>) :
                </label>
                <input
                  value={userData.phone}
                  type="text"
                  className={
                    validInputs.phone
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  onChange={(e) => handleOnChangeInput(e.target.value, "phone")}
                />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>User name :</label>
                <input
                  value={userData.username}
                  type="email"
                  className={
                    validInputs.username
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  onChange={(e) =>
                    handleOnChangeInput(e.target.value, "username")
                  }
                />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Password (<span className="red">*</span>) :
                </label>
                <input
                  value={userData.password}
                  type="password"
                  className={
                    validInputs.password
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  onChange={(e) =>
                    handleOnChangeInput(e.target.value, "password")
                  }
                />
              </div>
              <div className="col-12 col-sm-12 form-group">
                <label>Address :</label>
                <input
                  value={userData.address}
                  type="text"
                  className={
                    validInputs.address
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  onChange={(e) =>
                    handleOnChangeInput(e.target.value, "address")
                  }
                />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>Gender :</label>
                <select
                  className={
                    validInputs.sex ? "form-select" : "form-select is-invalid"
                  }
                  onChange={(e) => handleOnChangeInput(e.target.value, "sex")}
                >
                  <option defaultValue="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Group (<span className="red">*</span>):
                </label>
                <select
                  className={
                    validInputs.group ? "form-select" : "form-select is-invalid"
                  }
                  onChange={(e) => handleOnChangeInput(e.target.value, "group")}
                >
                  {userGroups &&
                    userGroups.length > 0 &&
                    userGroups.map((item, index) => {
                      return (
                        <option key={`group-${index}`} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
