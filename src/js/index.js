import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            InjectionID:0
        }

        if(typeof web3 != 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
         }else{
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
         }
         const MyContract = web3.eth.contract([
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "enum Passport.TotalStatus",
                        "name": "totalStatus",
                        "type": "uint8"
                    }
                ],
                "name": "AuthorityChangeToatalStatusEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "i",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "enum Passport.InjectionStatus",
                        "name": "proposal",
                        "type": "uint8"
                    }
                ],
                "name": "AuthorityDisposeUncheckedInjectionEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "AuthorityGetUncheckedInjectionListEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "auth",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "kind",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "ID",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    }
                ],
                "name": "HospitalSubmitInfomationEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "LookUpEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "VaccinatedOneGetHisPassportEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "VaccinatedOneGetListEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "deliverPassportEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "grantAuthorityEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "grantHospitalEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "i",
                        "type": "uint256"
                    }
                ],
                "name": "showSpecificInjectionEvent",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "enum Passport.TotalStatus",
                        "name": "totalStatus",
                        "type": "uint8"
                    }
                ],
                "name": "AuthorityChangeToatalStatus",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "i",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Passport.InjectionStatus",
                        "name": "proposal",
                        "type": "uint8"
                    }
                ],
                "name": "AuthorityDisposeUncheckedInjection",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "AuthorityGetUncheckedInjectionList",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "flist",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "cnt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalCnt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "herenumbersinWaitingList",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "authorityAddr",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "kind",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "ID",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    }
                ],
                "name": "HospitalSubmitInfomation",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "InjectionID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "LookUp",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "ID",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "injectedIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Passport.TotalStatus",
                        "name": "totalStatus",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "VaccinatedOneGetHisPassport",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "_ID",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "enum Passport.TotalStatus",
                        "name": "_totalStatus",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "VaccinatedOneGetList",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "list",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "deliverPassport",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "grantAuthority",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "grantHospitals",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "i",
                        "type": "uint256"
                    }
                ],
                "name": "showSpecificInjection",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "_InjectionID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_kind",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "_ID",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_date",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_injectedIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Passport.InjectionStatus",
                        "name": "_InjectionStatus",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "testt",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "n",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ])
         this.state.ContractInstance = MyContract.at('0x807DAD33cB6fB78d858c059375BDcb8ff3D2d06F')

         window.a = this.state

    }

    componentDidMount(){
        this.updateState()
        this.setupListeners()
  
        setInterval(this.updateState.bind(this), 7e3)
    }

    updateState(){
        this.state.ContractInstance.InjectionID((err, result) => {
            if(result != null){
               this.setState({
                  InjectionID: parseInt(result)
               })
            }
         })
    }

    setupListeners(){
       
     }

    // returnInjectionID(){
    //     return this.state.InjectionID;
    // }
    
    render(){
        return(
            <div> 
		
        <h1>Choose Your Identity</h1>
   
   <br />
   <button onclick="getAuthorityPart()">AuthorityPart</button>
   <button onclick="getHospitalPart()">HospitalPart</button>
   <button onclick="getUserPart()">UserPart</button>
        
        <div id="AuthorityPart" style="display: none;">
		<h2>Here you are Authority</h2>
		<nav>       
		  <a onclick="getDeliverPassport()">DeliverPassport</a>
		  <a onclick="getChangeTotalStatus()">ChangeTotalStatus</a>
		  <a onclick="getGetList()">GetList</a>
		  <a onclick="getGrantHospital()">GrantHospital</a>
		  <a onclick="getGrantAuthority()">GrantAuthority</a>
		  <a onclick="getLookUp()">LookUp</a>
		  <br/>
		  <a onclick="getDispose()">Dispose</a>
		</nav> 
		<section>
		  <div id="DeliverPassport" style="display: none;">
			  DeliverPassport here. 
			  <br/>
			  <br/>
			  Enter the address of the user you need to send the passport:
			  <br/>
			  <input type="text"/>
			  <br/>
			  Enter the name of the receiver:
			  <br/>
			  <input type="text"/>
			  <button> Submit </button>
		  </div>
		  
		  <div id="ChangeTotalStatus" style="display: none;">
			  ChangeTotalStatus here
			  <br/>
			  <br/>
			  Enter the address of the user:
			  <br/>
			  <input type="text"/>
			  <br/>
			  Enter the status you want to change to (0-2):
			  <br/>
			  <input type="text"/>
			  <button>Submit</button>
		  </div>
		
		  <div id="GetList" style="display: none;">
			  GetList here
			  <br/>
			  <br/>
			  <p>This is the place for the unchecked list</p>
			  <br/>
			  <button>Get</button>
		  </div>
		  <div id="GrantHospital" style="display: none;">
			  Grant Hospital here
			  <br/>
			  <br/>
			  Enter the address of the hospital to be granted:
			  <br/>
			  <input type="text"/>
			  <button>Submit</button>
		  </div>
	   
		  <div id="GrantAuthority" style="display: none;">
			  Grant Authority here
			  <br/>
			  <br/>
			  Enter the address of the authority to be granted:
			  <br/>
			  <input type="text"/>
			  <button>Submit</button>
		  </div>
	 
		  <div id="LookUp" style="display: none;">
			  Look Up user's passport
			  <br/>
			  <br/>
			  Enter the user's address:
			  <input type="text"/>
			  <button>Submit</button>
		  </div>
		  <div id="Dispose" style="display: none;">
			  Dispose unchecked vaccination
			  <br/>
			  <br/>
			  Enter the index of the vaccination waiting for dispose:
			  <br/>
			  <input type="text"/>
			  <br/>
			  Enter the proposal here (0-3):
			  <br/>
			  <input type="text"/>
			  <button>Submit</button>
		  </div>
  

		</section>
		</div>
  <div id="HospitalPart" style="display: none;">
	  <h2>Here you are Hospital</h2>
	  <nav>       
		<a onclick="HosDeliverPassport()">DeliverPassport</a>
		<a onclick="HosLookUp()">LookUp</a>
		<br/>
		<a onclick="SubmitInfo()">SubmitInfo</a>
	   
	  </nav>
	  <section>
		<div id="HosDeliverPassport" style="display: none;">
			Hospital DeliverPassport here
			<br/>
			<br/>
			Enter the address of the user you need to send the passport:
			<br/>
			<input type="text"/>
			<br/>
			Enter the name of the receiver:
			<br/>
			<input type="text"/>
			<button> Submit </button>
		</div>
		
		<div id="HosLookUp" style="display: none;">
			Hospital look up here
			<br/>
			<br/>
			Enter the user's address:
			<input type="text"/>
			<button>Submit</button>
		</div>
	  
		<div id="SubmitInfo" style="display: none;">
		   Submit Information here
		   <br/>
		   <br/>
		   Enter the authority's address:
		   <br/>
		   <input type="text"/>
		   <br/>
		   Enter the vaccine type:
		   <br/>
		   <input type="text"/>
		   <br/>
		   Enter the ID (address) of the user:
		   <br/>
		   <input type="text"/>
		   <br/>
		   Enter the date of vaccination:
		   <br/>
		   <input type="text"/>
		   <button>Submit</button>
		</div>
		
	  </section>
  </div>
  <div id="UserPart" style="display: none;">
	  <h2>Here you are User</h2>

	 <nav>       
		<a onclick="GetPassport()">GetPassport</a>
		<br/>
		<a onclick="UserGetList()">GetList</a>
		<br/>
		<a onclick="Specific()">SpecificVaccine</a>
	   
	  </nav>
	  <section>
		<div id="GetPassport" style="display: none;">
			Get your own vaccine passport here
			<br/>
			<br/>
			<p>This is the place for passport information</p>
			<br/>
			<button>Get</button>
		</div>
		
		<div id="UserGetList" style="display: none;">
			Get your vaccination list here
			<br/>
			<br/>
			<p>This is the place for your vaccination list</p>
			<br/>
			<button>Get</button>
		</div>
	  
		<div id="Specific" style="display: none;">
		   Search for your specific vaccination here
		   <br/>
		   <br/>
		   <p>This is place for the specific vaccination by index</p>
		   <br/>
		   Enter the index of vaccination list:
		   <br/>
		   <input type="text"/>
		   <button>Get</button>
		</div>
		
	  </section>
  </div>
</div>
            
        
        )
    }
    
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)