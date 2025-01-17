import React, { Component } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

import EditBtnCellRenderer from "./editBtnCellRenderer";
import PdfResultRenderer from "./pdfResultRenderer";

 import { getOrderUserSettings } from "../../../../clinicPortalServices/userGridSettings";
 import { saveOrderSettings } from "../../../../clinicPortalServices/saveStateSettings";


//service calls
import { fetchOrderMasterData,exportOrders } from "../../../../clinicPortalServices/orderSearchService";
import { fetchPatientMasterData } from "../../../../clinicPortalServices/patientSearchService";
import { serviceConstants } from "../../../../patientPortalServices/constants";

var enterprise = require("@ag-grid-enterprise/core");
enterprise.LicenseManager.setLicenseKey(
	`${serviceConstants.AG_GRID_LICENSE_KEY}`
);

const getPatientInfo = (patientData, patientId) => {
	if (patientData && patientData.length > 0) {
		const foundPatientInfo = patientData.find((item) => {
			return item._id === patientId;
		});
		if(foundPatientInfo==null) return {};
		return {
			gender: foundPatientInfo.gender ||'',
			mrn: foundPatientInfo.mrn,
			dob: foundPatientInfo.date_of_birth,
			email: foundPatientInfo.email,
			mobile: foundPatientInfo.mobile,
		};
	}
};

class OrderGridDetails extends Component {
    constructor(props) {
		super(props);

		this.state = {
			modules: [
				ClientSideRowModelModule,
				MasterDetailModule,
				MenuModule,
				ColumnsToolPanelModule,
				AllCommunityModules,
				AllModules,
				ExcelExportModule,
				SetFilterModule,
				FiltersToolPanelModule,
			],
			gridName: "Order",
			pageSize: "",
			columnDefs: [
				{
					headerName: "Edit",
					minWidth: 80,
					maxWidth: 80,
					cellStyle: { textAlign: "center" },
					cellRenderer: "editBtnCellRenderer",
				},
				{
					headerName: "Patient Name",
					minWidth: 200,
					field: "patientName",
					resizable: true,
				},
				{
					headerName: "Test",
					minWidth: 150,
					field: "description",
				},
				
				{
					headerName: "Test Type",
					minWidth: 150,
					field: "testType",
					filter: "agSetColumnFilter",
				},
				{
					headerName: "Sample",
					minWidth: 150,
					field: "sample",
				},
				{
					headerName: "Result",
					field: "result",
					minWidth: 150,
					resizable: true,
					cellRenderer: "pdfResultRenderer",
					filter: "agSetColumnFilter",
				},
				{
					headerName: "Specimen Collected Date",
					field: "collectedDate",
					minWidth: 200,
					resizable: true,
				},
				{
					headerName: "Facility Source",
					minWidth: 150,
					resizable: true,
					field: "facilitySource",
				},
				{
					headerName: "Physician",
					minWidth: 150,
					resizable: true,
					field: "provider",
				},
				{
					headerName: "Received Date",
					field: "receivedDate",
					minWidth: 200,
					resizable: true,
				},
				{
					headerName: "Requisition",
					minWidth: 150,
					field: "requisition",
				},
			],
			frameworkComponents: {
				editBtnCellRenderer: EditBtnCellRenderer,
				pdfResultRenderer: PdfResultRenderer,
			},
			paginationNumberFormatter: function (params) {
				return "[" + params.value.toLocaleString() + "]";
			},
			defaultColDef: {
				flex: 1,
				filter: true,
				//enableRowGroup: true,
				//enablePivot: true,
				//enableValue: true,
				sortable: true,
			},
			rowData: null,
			//sideBar: { toolPanels: ["columns"] },
			//rowGroupPanelShow: "always",
			//pivotPanelShow: "always",
			excelStyles: [
				{
					id: "header",
					interior: {
						color: "#aaaaaa",
						pattern: "Solid",
					},
				},
				{
					id: "body",
					interior: {
						color: "#dddddd",
						pattern: "Solid",
					},
				},
			],
		};
	}

    onGridReady = (params) => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		//console.log(params.columnApi);
		this.loadGridData();
		this.loadGridSchema();
	};

    
	loadGridData = () => {
		var facilityID = window.localStorage.getItem("FACILITY_ID");
		//var facilityID = "";
		Promise.all([
			fetchOrderMasterData(facilityID),
			fetchPatientMasterData(facilityID),
		]).then(([orderData, patientData]) => {
			//console.log(orderData);
			if (orderData && orderData.data && orderData.data.length > 0) {
				const formattedData = orderData.data.map((item) => {
					const returnData = {
						orderId: item._id,
						patientName: item.patient_id
							? item.patient_id.first_name + " " + item.patient_id.last_name
							: "",
						description:
							item.test_info && item.test_info.description
								? item.test_info.description
								: "",
						testType:
							item.test_info && item.test_info.test_type
								? item.test_info.test_type
								: "",
						sample:
							item.test_info && item.test_info.sample
								? item.test_info.sample
								: "",
						result:
							item.test_info && item.test_info.covid_detected
								? item.test_info.covid_detected
								: "",
						collectedDate:
							item.test_info && item.test_info.collected
								? moment(item.test_info.collected, "YYYYMMDDHHmmss").format(
										"MM/DD/YYYY hh:mm A"
								  )
								: "",
						facilitySource: item.facility_source ? item.facility_source : "",
						provider:
							(item.provider && item.provider.first_name
								? item.provider.first_name
								: "") +
							" " +
							(item.provider && item.provider.last_name
								? item.provider.last_name
								: ""),
						receivedDate:
							item.test_info && item.test_info.received
								? moment(item.test_info.received, "YYYYMMDDHHmmss").format(
										"MM/DD/YYYY hh:mm A"
								  )
								: "",
						requisition:
							item.lab_order_id && item.lab_order_id ? item.lab_order_id : "",
						
						code: item.code ? item.code : "",
						codeType: item.code_type ? item.code_type : "",
						pdfPath:
							item.results && item.results.pdf_path
								? item.results.pdf_path
								: "",
						released:
							item.results && item.results.released
								? moment(item.results.released, "YYYYMMDDHHmmss").format(
										"MM/DD/YYYY hh:mm A"
								  )
								: "",
						releasedBy:
							item.results && item.results.releasedBy
								? item.results.releasedBy
								: "",

						refreshGrid: this.loadGridData,
					};

					if (item.patient_id && item.patient_id._id) {
						const patientInfo = getPatientInfo(
							patientData.data,
							item.patient_id._id
						);
						returnData.gender = patientInfo ? (patientInfo.gender||'') : "";
						returnData.mrn = patientInfo ? patientInfo.mrn : "";
						returnData.dob =
							patientInfo && patientInfo.dob
								? moment(patientInfo.dob, "YYYY-MM-DD").format("MM/DD/YYYY")
								: "";
						returnData.email = patientInfo ? patientInfo.email : "";
						returnData.mobile = patientInfo ? patientInfo.mobile : "";
					}

					return returnData;
				});
				//console.log(formattedData);
				this.setState({ rowData: formattedData });
			} else this.setState({ rowData: [] });
		});
	};

    onFilterTextChange = (e) => {
		this.gridApi.setQuickFilter(e.target.value);
	};

    onBtExport = () => {
		this.gridApi.exportDataAsExcel({});
		exportOrders();
	};

    onPageSizeChanged = () => {
		var value = document.getElementById("page-size").value;
		this.gridApi.paginationSetPageSize(Number(value));
	};

    loadGridSchema = () => {
		var userId = window.localStorage.getItem("USER_ID");
		getOrderUserSettings(userId, this.state.gridName).then((orderUserInfo) => {
			//console.log("getSettings", orderUserInfo);
			// const columnState = userInfo.data.grid_state[0].columns;

			const columnState =
				orderUserInfo.data &&
				orderUserInfo.data.grid_state.find((item) => {
					return item.grid_name === "Order";
				}).columns;
			console.log("columnState-retrieved", columnState);
			if (columnState) {
				this.gridColumnApi.applyColumnState({
					state: columnState,
					applyOrder: true,
				});
			} else {
				this.gridColumnApi.resetColumnState();
			}

			const pageSize =
				orderUserInfo.data &&
				orderUserInfo.data.grid_state.find((item) => {
                    
					return item.grid_name === "Order";
				}).page_size;
			document.getElementById("page-size").value =
				pageSize && pageSize > 0 ? pageSize : 20;
			this.onPageSizeChanged();
		});
	};

    saveState = () => {
		var userId = window.localStorage.getItem("USER_ID");
		const columnState = this.gridColumnApi.getColumnState();
		var pageSize = document.getElementById("page-size").value;
		console.log("columnState", columnState);

		saveOrderSettings(userId, this.state.gridName, columnState, pageSize).then(
			() => {
				console.log("saveSettings success");
				alert("Settings saved successfully !!");
			}
		);
	};

    resetState = () => {
		this.gridColumnApi.resetColumnState();
	};

    clearFilter = () => {
		this.gridApi.setFilterModel(null);
		this.gridApi.setQuickFilter(null);
		document.getElementById("reset-form").value="";
	};


    render() {
		return (
			<div>
				<div className="breadcrumb-bar">
					<div className="container-fluid">
						<div className="row align-items-center">
							<div className="col-md-12 col-12">
								<nav aria-label="breadcrumb" className="page-breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item">
											<a href="/">Home</a>
										</li>
										<li className="breadcrumb-item active" aria-current="page">
											Orders
										</li>
									</ol>
								</nav>
								<h2 className="breadcrumb-title">Orders</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="row" style={{ padding: " 12px" }}>
					<div className="col-md-3">
						<TextField
							label="Quick Search"
							variant="outlined"
							className="form-control"
							id="reset-form"
							InputLabelProps={{
								shrink: true,
							  }}
							type="string"
							margin="dense"
							onChange={this.onFilterTextChange}
						/>
					</div>
					<div>
						<button
							className="btn btn-primary submit-btn button-info-grid"
							onClick={() => this.clearFilter()}
						>
							<i class="fa fa-times" aria-hidden="true"></i> Clear Filter
						</button>
					</div>
					<div className="col grid-buttons">
						<div>
							<TextField
								style={{ width: "100px"}}
								label="Page Size"
								variant="outlined"
								className="form-control"
								id="page-size"
								//size="small"
								InputLabelProps={{
									shrink: true,
								  }}
								type="number"
								margin="dense"
								onChange={this.onPageSizeChanged}
							/>
						</div>
						<div>
							<button
								className="btn btn-primary submit-btn button-info-grid"
								onClick={() => this.saveState()}
							>
								<i class="far fa-save"></i> Save
							</button>
							<button
								className="btn btn-primary submit-btn button-info-grid"
								onClick={() => this.resetState()}
							>
								{" "}
								<i class="fa fa-repeat"></i> Default
							</button>
						</div>
						<div>
							<button
								className="btn btn-primary submit-btn button-info-grid"
								onClick={() => this.onBtExport()}
							>
								<i class="fa fa-file-excel-o" aria-hidden="true"></i> Export to
								Excel
							</button>
						</div>
					</div>
				</div>
				<div
					style={{
						width: "100%",
						height: "100vh",
						padding: "15px 15px 15px 15px",
					}}
				>
					<div
						id="myGrid"
						style={{
							height: "100%",
							width: "100%",
						}}
						className="ag-theme-alpine"
					>
						<AgGridReact
							modules={this.state.modules}
							columnDefs={this.state.columnDefs}
							defaultColDef={this.state.defaultColDef}
							masterDetail={true}
							onGridReady={this.onGridReady}
							rowData={this.state.rowData}
							frameworkComponents={this.state.frameworkComponents}
							pagination={true}
							//paginationAutoPageSize={true}
							paginationPageSize={20}
							paginationNumberFormatter={this.state.paginationNumberFormatter}
							excelStyles={this.state.excelStyles}
							// sideBar={this.state.sideBar}
							// rowGroupPanelShow={this.state.rowGroupPanelShow}
							// pivotPanelShow={this.state.pivotPanelShow}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default OrderGridDetails;