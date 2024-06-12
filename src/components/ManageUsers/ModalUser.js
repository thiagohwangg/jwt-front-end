import { Button, Modal } from "react-bootstrap";
import { fetchGroup } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalUser = ({ title }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [group, setGroup] = useState('');
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let response = await fetchGroup();
    if (response?.data.EC === 0) {
      setUserGroups(response.data.DT);
    } else {
      toast.error(response.data.EM);
    }
  };
  const handleClose = () => {};
  return (
    <>
      <Modal size="lg" show={true} onHide={handleClose} className="modal-user">
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
                <input type="email" className="form-control" />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Phone number (<span className="red">*</span>) :
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-12 col-sm-6 form-group">
                <label>User name :</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Password (<span className="red">*</span>) :
                </label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-12 col-sm-12 form-group">
                <label>Address :</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>Gender :</label>
                <select className="form-select">
                  <option defaultValue="Male">
                    Male
                  </option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 form-group">
                <label>
                  Group (<span className="red">*</span>):
                </label>
                <select className="form-select">
                  {userGroups &&
                    userGroups.length > 0 &&
                    userGroups.map((item, index) => {
                      return <option key={`group-${index}`} value={item.id}>{item.name}</option>;
                    })}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
