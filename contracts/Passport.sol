pragma solidity ^0.5.1;

import "./IterableMapping.sol";

contract Passport{
    
    enum Identity {Hospital,Authority,VaccinatedOne}
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
    uint256 InjectionID;

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


    constructor() public{
        identity[msg.sender]=Identity.Authority;
        numbersInWaitingList[msg.sender]=0;
        //Auhority 0xd16AAecB76318c363F5dfb6bA192163a3695d4d8
        //Hospital 0x9a6536b20EE818899C7026925AAfA27A656c32f8
        //user     0x7Ddf0cd1f0D562F73C27F662ca389c72553B5470
        //user2    0x4004b49c9DC5217b752b586894c5269f37d917b8
        
        identity[0x9a6536b20EE818899C7026925AAfA27A656c32f8]=Identity.Hospital;
        InjectionID=0;
    }
    
    function testt() public view returns(uint n, Identity id){
        
        n=2;
        Identity id=identity[msg.sender];
        
    }



    function LookUp(address addr) public view havingAccess returns(address ID, string memory name, uint injectedIndex,TotalStatus totalStatus){
        ID = personalPassport[addr].ID;
        name = personalPassport[addr].name;
        injectedIndex = personalPassport[addr].injectionIndex;
        totalStatus = personalPassport[addr].totalStatus;
    }
    function deliverPassport(address addr,string memory _name) public havingAccess{
        PersonalPassport memory apassport=PersonalPassport({ID:addr,name:_name,injectionIndex:0,totalStatus:TotalStatus.haventVaccinated});
        personalPassport[addr]=apassport;
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

        
        success=true;
    }


    //Authority检查并修改Passport信息的过程可以改成按引用传递
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
    }

    function AuthorityDisposeUncheckedInjection(uint i, InjectionStatus proposal) public isAuthority {
        Injection memory injection=waitingList[msg.sender][i];
        address ID=injection.ID;
        uint256 InjectionID=injection.InjectionID;
        uint injectedIndex=injection.injectedIndex;

        waitingList[msg.sender][i].injectionStatus=proposal;

        personalPassport[ID].injectionInfo[injectedIndex].injectionStatus=proposal;

    }

    function AuthorityChangeToatalStatus(address addr,TotalStatus totalStatus) public isAuthority{
        personalPassport[addr].totalStatus=totalStatus;
    }

}






