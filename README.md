# VaccinePassportDapp
GECSUMMER


Hospital: submit vaccinating infomation
Authority: check the information and update our passports
VaccinatedOne: get his passport

struct:
1.mapping(address=>indentity(H/A/O)) to verify his access, used to modifier

2.mapping(address=>passport)

3.Passport: 
address
name
mapping(uint (indexOfInjection)=>Injection)
totalStatus(haventVaccinated, waitingVaccinationAndAuthority, vaccinated)

4.Injection:
kind
who accepted (and who injected)
status(injected, authorithed, outdated)

5.To show specific Auhority the injection he is responsible for and not authorithed 
mapping(address=>WaitingList)

6.WaitingList
mapping(uint=>Injection)



Hospital: 
func0(lookupOurPassport): by our address
func1(SubmitInfomation) :to:Authority's address, inforamtion includes: which kind of vaccination, (what version and which batch,) when, who accepted (and who injected)    The total

Authority:
func0(lookupOurPassport): by our address

