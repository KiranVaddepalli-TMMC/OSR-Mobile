export class dunnage {
    dunnageId: '';
    name: '';
    shopId: '';
    qtyStack: '';
    weight: '';
    depth: '';
    height: '';
    width: '';
    value: '';
    modOrDun: '';
    liftType: '';
    footprint: '';
    grouping: '';
    dulDunq: '';
    rackLength: '';
    rackWidth: '';
    rackHeight: '';
  }
  export class dunnageContainer {
     dunnageContainerId: '';
     vesselScheduleId: '';
     bolNumber: '';
     invoiceNumber: '';
     chassieNumber: '';
     sealNumber: '';
     shipDate: '';
     shopId: '';
     status: '';
     startDate: '';
   }

  export class errorMessages {
     fieldName: '';
     message: '';
   }

  export class UserDO {  
     id: '';
     loginId: string;
     tmCode: '';
     name: '';
     firstName: '';
     lastName: '';
     shop: '';
     shopName: '';
     shift: '';
     email: '';
     phone: '';
     extension: '';
     userType: '';
     shops: [0];
     roles: [0];
     shifts: [];
     rolesName: [];
     shiftsName: [];
     password: string;
     isTeamMember: false;
     isConveyanceTM: false;
     isConveyanceTL: false;
     department: '';
     psNum: '';
     userAdmin: false;
     isSystemAdmin: false;
   }

  export class ShopDO {
     id: '';
     name: '';
     laaShop: '';
     ShopId: '';
     shopName: '';
     shortName: '';
     validationType: '';
     shopCode: '';
     conveyanceGroup: '';
     maxLifts: 1;
     uniqueScan: false;
     renbanPrefixes: '';
     validContainerTypes: '';
     validDestinations: '';
     multipleContaierOpenAllowed: false;
     maxContainerOpen: 1;
   }

  export class RoleDO {
     id: 1;
     code: '';
     description: '';
   }

  export class UserShop {
     loginId: '';
     shopId: 1;
     userShopId: 1;
   }

   export class ScanItemsRequest {

    scanDataList: any;
	dunnageContainerList: any; 
	dunnageContainer: any;
	errorMessages: any;
	dunnageContainerId: number;
	containerId: number;
	liftId: number;
	liftCount: number;
	footprint: string;
	isManual: string;
	user: UserDO;
	currentDestination: string;
	headerStatus: string;
	containerNumber: string;
	sealNumber: string;
	targetStatus: string;
	lastStatus: string;
	liftNumber: string;
	message: string;
   }