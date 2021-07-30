import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home-service';
import { ScanItemsRequest } from 'src/app/models/model';
import { ActivatedRoute, Router } from '@angular/router';
//import { Messages, Message } from 'primeng/primeng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showStartScan = false;
  showManualScan = false;
  manualScanList = [{ name: "" }];
  welcomeDetails: any;
  openContainerList = [];
  selectedContainer: any;
  activeStatus = false;
  errorMessage: any;
  listErrorMessages= [];
  showComplete = false;
  constructor(
    private service: HomeService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activateRoute.queryParams.subscribe(param => {
      if (param.status) {
        this.activeStatus = param.status;
        this.selectedContainer = '';
        this.showManualScan = false;
        this.showStartScan = false;
        this.getContainerStatus();
      }
    })
  }

  ngOnInit(): void {
    console.log(this.activeStatus)
    if (!this.activeStatus) {
      this.getWelcomeStatus();
    }
  }

  getWelcomeStatus() {
    this.service.getWelcomeDetails().subscribe((res: any) => {
      console.log(res)
      this.welcomeDetails = res;
      this.selectedContainer = '';
      this.openContainerList = [];
      this.showManualScan = false;
      this.showStartScan = false;
      this.openContainerList = res.openContainers;
      if (this.openContainerList.length === 1) {
        this.selectedContainer = this.openContainerList[0]
      }
    }, err => {
      console.log(err)
    })
  }

  getContainerStatus() {
    let body = {}
    if (this.welcomeDetails) {
      body = {
        containerNum: this.welcomeDetails.dunnageContainer.containerNum,
        currentDestination: this.welcomeDetails.currentDestination
      }
      this.service.getContainerStatus(body).subscribe((res: any) => {
        this.welcomeDetails['liftList'] = res.liftList;
        this.welcomeDetails["statusDesc"] = res.statusDesc;
        this.welcomeDetails["headerStatus"] = res.headerStatus;
        this.welcomeDetails["selectedContainer"] = res.containerNumber;
        this.selectedContainer = res.containerNumber
      }, err => {
        console.log(err)
      })
    }else{
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>
      this.router.navigate(['home'])
      )
    }
  }

  onContainerSelect(data) {
    this.selectedContainer = data;
  }

  StartScan() {
    console.log('start scan')
    this.showStartScan = true;
    this.activeStatus = false;
    return;
    let scanItem = new ScanItemsRequest();

    let obj = {
      dunnage: {
        dunnageId: '',
        name: '',
        shopId: '',
        qtyStack: '',
        weight: '',
        depth: '',
        height: '',
        width: '',
        value: '',
        modOrDun: '',
        liftType: '',
        footprint: '',
        grouping: '',
        dulDunq: '',
        rackLength: '',
        rackWidth: '',
        rackHeight: '',
      },
      // dunnageContainer: {
      //   dunnageContainerId: '',
      //   vesselScheduleId: '',
      //   bolNumber: '',
      //   invoiceNumber: '',
      //   chassieNumber: '',
      //   sealNumber: '',
      //   shipDate: '',
      //   shopId: '',
      //   status: '',
      //   startDate: '',
      // },
      // errorMessages: {
      //   fieldName: '',
      //   message: '',
      // },
      // UserDO: {
      //   id: '',
      //   loginId: '',
      //   tmCode: '',
      //   name: '',
      //   firstName: '',
      //   lastName: '',
      //   shop: '',
      //   shopName: '',
      //   shift: '',
      //   email: '',
      //   phone: '',
      //   extension: '',
      //   userType: '',
      //   shops: [0],
      //   roles: [0],
      //   shifts: [],
      //   rolesName: [],
      //   shiftsName: [],
      //   password: '',
      //   isTeamMember: false,
      //   isConveyanceTM: false,
      //   isConveyanceTL: false,
      //   department: '',
      //   psNum: '',
      //   userAdmin: false,
      //   isSystemAdmin: false,
      // },
      // ShopDO: {
      //   id: '',
      //   name: '',
      //   laaShop: '',
      //   ShopId: '',
      //   shopName: '',
      //   shortName: '',
      //   validationType: '',
      //   shopCode: '',
      //   conveyanceGroup: '',
      //   maxLifts: 1,
      //   uniqueScan: false,
      //   renbanPrefixes: '',
      //   validContainerTypes: '',
      //   validDestinations: '',
      //   multipleContaierOpenAllowed: false,
      //   maxContainerOpen: 1,
      // },
      // RoleDO: {
      //   id: 1,
      //   code: '',
      //   description: '',
      // },
      // UserShop: {
      //   loginId: '',
      //   shopId: 1,
      //   userShopId: 1,
      // }
    }

    this.service.postScan(scanItem).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  StartManualScan() {
    this.showStartScan = false;
    this.showManualScan = true;
  }

  addScanToList() {
    this.manualScanList.push({ name: "" });
  }

  removeScanToList() {
    this.manualScanList.splice(this.manualScanList.length - 1, 1);
  }

  validateScan() {
    const body = {
      scanDataList: this.manualScanList,
      containerNum: this.welcomeDetails.dunnageContainer.containerNum,
      containerId: this.welcomeDetails.containerId,
      isManual: "Y",
      currentDestination: this.welcomeDetails.currentDestination,
      dunnageContainerId: this.welcomeDetails.dunnageContainer.dunnageContainerId
    }
    this.service.validateScan(body).subscribe((resp: any) => {
      if (resp.validLift) {
        this.selectedContainer = '';
        this.openContainerList = [];
        this.showManualScan = false;
        this.showStartScan = false;
        this.activeStatus = true;
        this.getContainerStatus();
      } else {
        this.errorMessage = resp.responseMesssage;
      }

    })
  }
  onInputChange(event, index) {
    this.manualScanList[index].name = event.target.value;
  }

  onLiftCheck(liftData){
    if(liftData.validated == "W"){
      this.checkLiftStatus(liftData);
    }else{
      this.uploadContainer(liftData);
    }
    
  }
  checkLiftStatus(liftData){
    let body = {
      liftId:liftData.liftId,
      liftNumber:liftData.liftNumber,
      currentDestination:this.welcomeDetails.currentDestination,
      dunnageContainerId:liftData.dunnageContainerId
    }
    this.service.checkLiftStatus(body).subscribe((resp:any) =>{
      this.listErrorMessages = resp.errorMesages;
      if(this.listErrorMessages.length == 0){
        this.uploadContainer(liftData);
      }
    })
  }

  uploadContainer(liftData){
      let body = {
        liftId:liftData.liftId,
        liftNumber:liftData.liftNumber,
        currentDestination:this.welcomeDetails.currentDestination,
        dunnageContainerId:liftData.dunnageContainerId
      }
      this.service.uploadToContainer(body).subscribe((resp:any) =>{
       this.getContainerStatus();
      })
  }

  completeContainer(){
    let body = {
      containerNumber:this.selectedContainer,
      currentDestination:this.welcomeDetails.currentDestination,
      dunnageContainerId:this.welcomeDetails.dunnageContainer.dunnageContainerId
    }
    this.service.completeContainer(body).subscribe((resp:any) =>{
    if(resp.statusDesc == "welcome"){
      this.showComplete = true;
      this.selectedContainer = null;
      this.openContainerList = [];
    }
    })
  }
}
