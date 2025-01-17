import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  saveOrderEditData,
  updateResultPDF,
} from "../../../../clinicPortalServices/orderEditService";
import moment from "moment";
import { results } from "../../patientSearch/clinicPatientGrid/optionsData";
import { testTypes } from "../../patientSearch/clinicPatientGrid/optionsData";

export default class EditBtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      show: false,
      orderId: props.data.orderId,
      gender: props.data.gender ? props.data.gender : "",
      dob: props.data.dob ? props.data.dob : "",
      mrn: props.data.mrn ? props.data.mrn : "",
      provider: props.data && props.data.provider ? props.data.provider : "",
      facilitySource: props.data.facilitySource
        ? props.data.facilitySource
        : "",
      receivedDate:
        props.data && props.data.receivedDate ? props.data.receivedDate : "",
      description:
        props.data && props.data.description ? props.data.description : "",
      testType: props.data && props.data.testType ? props.data.testType : "",
      sample: props.data && props.data.sample ? props.data.sample : "",
      result: props.data && props.data.result ? props.data.result : "",
      collectedDate:
        props.data && props.data.collectedDate ? props.data.collectedDate : "",

      requisition:
        props.data && props.data.requisition ? props.data.requisition : "",
      code: props.data && props.data.code ? props.data.code : "",
      codeType: props.data && props.data.codeType ? props.data.codeType : "",
      patientName:
        props.data && props.data.patientName ? props.data.patientName : "",
      email: props.data && props.data.email ? props.data.email : "",
      mobile: props.data && props.data.mobile ? props.data.mobile : "",
      pdfPath: props.data && props.data.pdfPath ? props.data.pdfPath : "",
      released: props.data && props.data.released ? props.data.released : "",
      releasedBy:
        props.data && props.data.releasedBy ? props.data.releasedBy : "",
      refreshGrid: props.data.refreshGrid,
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    const intialState = {
      orderId: this.props.data.orderId,
      gender: this.props.data.gender ? this.props.data.gender : "",
      dob: this.props.data.dob ? this.props.data.dob : "",
      mrn: this.props.data.mrn ? this.props.data.mrn : "",
      provider:
        this.props.data && this.props.data.provider
          ? this.props.data.provider
          : "",
      facilitySource: this.props.data.facilitySource
        ? this.props.data.facilitySource
        : "",
      receivedDate:
        this.props.data && this.props.data.receivedDate
          ? this.props.data.receivedDate
          : "",
      description:
        this.props.data && this.props.data.description
          ? this.props.data.description
          : "",
      testType:
        this.props.data && this.props.data.testType
          ? this.props.data.testType
          : "",
      sample:
        this.props.data && this.props.data.sample ? this.props.data.sample : "",
      result:
        this.props.data && this.props.data.result ? this.props.data.result : "",
      collectedDate:
        this.props.data && this.props.data.collectedDate
          ? this.props.data.collectedDate
          : "",

      requisition:
        this.props.data && this.props.data.requisition
          ? this.props.data.requisition
          : "",
      code: this.props.data && this.props.data.code ? this.props.data.code : "",
      codeType:
        this.props.data && this.props.data.codeType
          ? this.props.data.codeType
          : "",
      patientName:
        this.props.data && this.props.data.patientName
          ? this.props.data.patientName
          : "",
      email:
        this.props.data && this.props.data.email ? this.props.data.email : "",
      mobile:
        this.props.data && this.props.data.mobile ? this.props.data.mobile : "",
      pdfPath:
        this.props.data && this.props.data.pdfPath
          ? this.props.data.pdfPath
          : "",
      released:
        this.props.data && this.props.data.released
          ? this.props.data.released
          : "",
      releasedBy:
        this.props.data && this.props.data.releasedBy
          ? this.props.data.releasedBy
          : "",
    };
    this.setState({ show: false, ...intialState });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOrderEditChanges = () => {
    const editParams = {
      description: this.state.description,
      testType: this.state.testType,
      sample: this.state.sample,
      result: this.state.result,
      collectedDate: this.state.collectedDate
        ? moment(this.state.collectedDate, "MM/DD/YYYY hh:mm A").format(
            "YYYYMMDDHHmmss"
          )
        : "",
      provider: this.state.provider,
      receivedDate: this.state.receivedDate
        ? moment(this.state.receivedDate, "MM/DD/YYYY hh:mm A").format(
            "YYYYMMDDHHmmss"
          )
        : "",
      requisition: this.state.requisition,
      patientName: this.state.patientName,
      orderId: this.state.orderId,
      email: this.state.email,
      mobile: this.state.mobile,
      facilitySource: this.state.facilitySource,
      mrn: this.state.mrn,
      dob: this.state.dob,
      pdfPath: this.state.pdfPath,
      released: this.state.released,
      releasedBy: this.state.releasedBy,
    };
    saveOrderEditData(editParams).then((userDetails) => {
      this.setState({
        editParams: userDetails,
        show: false,
      });

      // call refresh grid function
      //this.props.data.refreshGrid();
      this.state.refreshGrid();

      editParams.collectedDate = editParams.collectedDate
        ? moment(editParams.collectedDate, "YYYYMMDDHHmmss").format(
            "MM/DD/YYYY hh:mm A"
          )
        : "";
      editParams.receivedDate = editParams.receivedDate
        ? moment(editParams.receivedDate, "YYYYMMDDHHmmss").format(
            "MM/DD/YYYY hh:mm A"
          )
        : "";
      //call this method to generate/update the result letter pdf
      updateResultPDF(editParams).then((data) => {});
    });
  };

  render() {
    const formStyle = {
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderRadius: "0px",
    };
    return (
      <div>
        <button
          onClick={this.handleShow}
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          <i class="fas fa-pen"></i>
        </button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Order Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row form-row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Patient Name</label>
                    <input
                      style={formStyle}
                      type="text"
                      disabled
                      className="form-control"
                      name="patientName"
                      value={this.state.patientName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>MRN</label>
                    <input
                      style={formStyle}
                      type="text"
                      disabled
                      className="form-control"
                      name="mrn"
                      value={this.state.mrn}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Date Of Birth</label>
                    <input
                      style={formStyle}
                      type="text"
                      disabled
                      className="form-control"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <input
                      style={formStyle}
                      type="text"
                      disabled
                      className="form-control"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Physician</label>
                    <input
                      style={formStyle}
                      type="text"
                      className="form-control"
                      name="provider"
                      disabled
                      value={this.state.provider}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Facility</label>
                    <input
                      style={formStyle}
                      type="text"
                      className="form-control"
                      name="facilitySource"
                      disabled
                      value={this.state.facilitySource}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Test Description</label>
                    <input
                      type="text"
                      style={formStyle}
                      className="form-control"
                      name="description"
                      disabled
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Test Type</label>
                    {/* <input
											style={formStyle}
											type="text"
											disabled
											className="form-control"
											name="testType"
											value={this.state.testType}
											onChange={this.handleChange}
										/> */}
                    <select
                      style={formStyle}
                      className="form-control select"
                      name="testType"
                      value={this.state.testType}
                      onChange={this.handleChange}
                    >
                      {/* <option>Select</option>
                      <option>Nasal Swab</option>
                      <option>Nasopharyngeal Swab</option> */}
                      {testTypes.map((test) => {
                        return <option>{test.testType}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Requisition</label>
                    <input
                      style={formStyle}
                      type="text"
                      className="form-control"
                      name="requisition"
                      value={this.state.requisition}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Sample</label>
                    <input
                      style={formStyle}
                      type="text"
                      className="form-control "
                      name="sample"
                      value={this.state.sample}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Collected Date</label>
                    <input
                      style={formStyle}
                      type="text"
                      className="form-control"
                      name="collectedDate"
                      value={this.state.collectedDate}
                      onChange={this.handleChange}
                    />
                    <label style={{ fontSize: "13px" }}>
                      Date format - MM/DD/YYYY hh:mi AM/PM
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Received Date</label>
                    <input
                      style={formStyle}
                      type="text"
                      className="form-control"
                      name="receivedDate"
                      value={this.state.receivedDate}
                      onChange={this.handleChange}
                    />
                    <label style={{ fontSize: "13px" }}>
                      Date format - MM/DD/YYYY hh:mi AM/PM
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Result</label>
                    <select
                      style={formStyle}
                      className="form-control select"
                      name="result"
                      value={this.state.result}
                      onChange={this.handleChange}
                    >
                      {results.map((res) => {
                        return <option>{res.result}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Released Date</label>
                    <input
                      style={formStyle}
                      type="text"
                      className="form-control"
                      name="released"
                      value={this.state.released}
                      onChange={this.handleChange}
                    />
                    <label style={{ fontSize: "13px" }}>
                      Date format - MM/DD/YYYY hh:mi AM/PM
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleOrderEditChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
