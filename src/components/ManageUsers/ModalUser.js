import { Button, Modal } from "react-bootstrap";
import { fetchGroup, createNewUser, updateCurrentUser} from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = ({ action, show, onHide, dataModalUser }) => {
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

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : ''});
    }
  }, [dataModalUser]);

  useEffect(() => {
    if(action === 'CREATE') {
      if(userGroups) {
        setUserData({ ...userData, group: userGroups[0]?.id });

      }
    }
  }, [action])

  const getGroups = async () => {
    let response = await fetchGroup();
    if (response?.EC === 0) {
      setUserGroups(response.DT);
      if (response?.DT) {
        let group = response.DT;
        setUserData({ ...userData, group: group[0]?.id });
      }
    } else {
      toast.error(response.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    // create user
    if(action === 'UPDATE') return true;
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
      let response = action === 'CREATE' ? await createNewUser({
        ...userData,
        groupId: userData["group"],
      }) : await updateCurrentUser({
        ...userData,
        groupId: userData["group"],
      });
      if (response.EC === 0) {
        onHide();
        setUserData({ ...defaultUserData, group: userGroups[0]?.id });
      }
      if (response?.EC !== 0) {
        toast.error(response.EM);
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[response.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  const handleCloseModalUser = () => {
    onHide()
    setUserData(defaultUserData)
    setValidInputs(validInputDefault)
  } 

  return (
    <>
      <Modal size="lg" show={show} onHide={handleCloseModalUser} className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title>
            <span>
              {action === "CREATE" ? "Create New User" : "Edit a user"}
            </span>
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
                disabled={action === 'CREATE' ? false : true}
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
                disabled={action === 'CREATE' ? false : true}
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
                {action === "CREATE" && (
                  <>
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
                  </>
                )}
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
                value={userData.sex}
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
                value={userData.group}
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
          <Button variant="secondary" onClick={handleCloseModalUser}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmUser}>
            {action === 'CREATE' ? 'Save' : 'Update'}           
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
