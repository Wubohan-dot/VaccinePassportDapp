pragma solidity ^0.5.1;

import "./IterableMapping.sol";

contract Passport{
    
    enum Identity {VaccinatedOne,Hospital,Authority}
    //1.mapping(address=>identity(H/A/O)) to verify his access, used to modifier
    mapping(address=>Identity) identity;

    //2.mapping(address=>passport)
    mapping(address=>PersonalPassport) personalPassport; 

    enum TotalStatus{haventVaccinated, waitingVaccinationAndAuthority, vaccinated}
    //3.PersonalPassport: 
    struct PersonalPassport{
        address ID;
        string name;
        mapping(uint=>Injection) injectionInfo;
        uint injectionIndex;
        TotalStatus totalStatus;
    }

    
    
    enum InjectionStatus{injected, authorithed, outdated, unvalid}
    //4.Injection:
    struct Injection{
        uint256 InjectionID;
        string kind;
        address ID;
        string date;
        uint injectedIndex;
        InjectionStatus injectionStatus;
    }
    uint256 public InjectionID;

    //5.To show specific Auhority the injection he is responsible for and not authorithed 
    mapping(address=>mapping(uint=>Injection)) waitingList;
    mapping(address=>uint) numbersInWaitingList;

    modifier isHospital(){
        require(identity[msg.sender]==Identity.Hospital);
        _;
    }
    modifier isAuthority(){
        require(identity[msg.sender]==Identity.Authority);
        _;
    }
    modifier havingAccess(){
        require((identity[msg.sender]==Identity.Authority)||(identity[msg.sender]==Identity.Hospital));
        _;
    }


    event LookUpEvent(address addr);
    event deliverPassportEvent(address addr, string name);
    event grantHospitalEvent(address addr);
    event grantAuthorityEvent(address addr);
    event HospitalSubmitInfomationEvent(address auth, string kind, address ID, string date);
    event AuthorityGetUncheckedInjectionListEvent();
    event AuthorityDisposeUncheckedInjectionEvent(uint i, InjectionStatus proposal);
    event AuthorityChangeToatalStatusEvent(address addr, TotalStatus totalStatus);
    event VaccinatedOneGetHisPassportEvent();
    event VaccinatedOneGetListEvent();
    event showSpecificInjectionEvent(uint i);


    constructor() public{
        identity[msg.sender]=Identity.Authority;
        numbersInWaitingList[msg.sender]=0;
        //Auhority 0xd16AAecB76318c363F5dfb6bA192163a3695d4d8
        //Hospital 0x9a6536b20EE818899C7026925AAfA27A656c32f8
        //user     0x7Ddf0cd1f0D562F73C27F662ca389c72553B5470
        //user2    0x4004b49c9DC5217b752b586894c5269f37d917b8
        
        //identity[0x9a6536b20EE818899C7026925AAfA27A656c32f8]=Identity.Hospital;
        InjectionID=0;
    }
    
    function testt() public view returns(uint n){
        
        n=2;
        
    }



    function LookUp(address addr) public view havingAccess returns(address ID, string memory name, uint injectedIndex,TotalStatus totalStatus){
        //emit LookUpEvent(addr);
        ID = personalPassport[addr].ID;
        name = personalPassport[addr].name;
        injectedIndex = personalPassport[addr].injectionIndex;
        totalStatus = personalPassport[addr].totalStatus;
    }
    function deliverPassport(address addr,string memory _name) public havingAccess{
        PersonalPassport memory apassport=PersonalPassport({ID:addr,name:_name,injectionIndex:0,totalStatus:TotalStatus.haventVaccinated});
        personalPassport[addr]=apassport;
        emit deliverPassportEvent(addr, _name);
    }
    function grantHospitals(address addr) public isAuthority{
        identity[addr]=Identity.Hospital;
        emit grantHospitalEvent(addr);
    }
    function grantAuthority(address addr) public isAuthority{
        identity[addr]=Identity.Authority;
        emit grantAuthorityEvent(addr);
    }

    function HospitalSubmitInfomation(address authorityAddr, string memory kind, address ID,string memory date) public isHospital returns(bool success){
        success=false;
        require(identity[authorityAddr]==Identity.Authority);
        
        uint number = numbersInWaitingList[authorityAddr];
        uint injectedNumber=personalPassport[ID].injectionIndex;
        
        Injection memory injection=Injection(InjectionID,kind,ID,date,injectedNumber,InjectionStatus.injected);

        
        personalPassport[ID].injectionInfo[injectedNumber]=injection;
        waitingList[authorityAddr][number]=injection;

        number=number+1;
        injectedNumber=injectedNumber+1;
        personalPassport[ID].injectionIndex=injectedNumber;
        numbersInWaitingList[authorityAddr]=number;

        InjectionID++;

        emit HospitalSubmitInfomationEvent(authorityAddr, kind, ID, date);
        success=true;
    }


    
    function AuthorityGetUncheckedInjectionList() public view isAuthority returns(uint[] memory flist,uint cnt,uint totalCnt,uint herenumbersinWaitingList){
        uint[] memory list=new uint[](100);
        totalCnt=0;
        cnt=0;
        for(uint i=0;i<numbersInWaitingList[msg.sender];i++){
            if(waitingList[msg.sender][i].injectionStatus==InjectionStatus.injected){
               list[cnt]=i;
               cnt++;
            }
            totalCnt++;
        }
        flist=new uint[](cnt);
        for(uint i=0;i<cnt;i++){
            flist[i]=list[i];
        }
        herenumbersinWaitingList = numbersInWaitingList[msg.sender];
        //emit AuthorityGetUncheckedInjectionListEvent();
    }

    function AuthorityDisposeUncheckedInjection(uint i, InjectionStatus proposal) public isAuthority {
        Injection memory injection=waitingList[msg.sender][i];
        address ID=injection.ID;
        uint256 InjectionID=injection.InjectionID;
        uint injectedIndex=injection.injectedIndex;

        waitingList[msg.sender][i].injectionStatus=proposal;

        personalPassport[ID].injectionInfo[injectedIndex].injectionStatus=proposal;
        emit AuthorityDisposeUncheckedInjectionEvent(i, proposal);

    }

    function AuthorityChangeToatalStatus(address addr,TotalStatus totalStatus) public isAuthority{
        personalPassport[addr].totalStatus=totalStatus;
        emit AuthorityChangeToatalStatusEvent(addr, totalStatus);
    }

    function AuthorityGetInjectionByID(uint index) public view isAuthority returns(Injection injection) {
        return waitingList[msg.sender][index];
    }

    function VaccinatedOneGetHisPassport() public view returns(address _ID, string memory _name, TotalStatus _totalStatus){
        //emit VaccinatedOneGetHisPassportEvent();
        
        _ID=personalPassport[msg.sender].ID;
        _name=personalPassport[msg.sender].name;
        _totalStatus=personalPassport[msg.sender].totalStatus;
    } 

    function VaccinatedOneGetList() public view returns(uint[] memory list){
        uint nums=personalPassport[msg.sender].injectionIndex;
        list=new uint[](nums);
        for(uint i=0;i<nums;i++){
            list[i]=i;
        }
        //emit VaccinatedOneGetListEvent();
    }

    function showSpecificInjection(uint i) public view returns(uint256 _InjectionID,string memory _kind,address _ID,string memory _date,uint _injectedIndex,InjectionStatus _InjectionStatus){
        //emit showSpecificInjectionEvent(i);
        
        _InjectionID=personalPassport[msg.sender].injectionInfo[i].InjectionID;
        _kind=personalPassport[msg.sender].injectionInfo[i].kind;
        _ID=personalPassport[msg.sender].injectionInfo[i].ID;
        _date=personalPassport[msg.sender].injectionInfo[i].date;
        _injectedIndex=personalPassport[msg.sender].injectionInfo[i].injectedIndex;
        _InjectionStatus=personalPassport[msg.sender].injectionInfo[i].injectionStatus;
    }

}






