    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import { Container, Row, Col } from 'react-grid-system';
    console.log("I am in program!!!!!!")
    class AnkObj extends React.Component{
        
        render(){
            let ankClass;
            let cbid ;
            let cdid ; 
            if(this.props.side==="left"){
                ankClass = "left"+ this.props.className;
                 cbid = "checkboxid" + "-" + this.props.entryIndex + "-" + this.props.ankObjIndex + "left";
                 cdid = "cdinputboxid" + "-" + this.props.entryIndex + "-" + this.props.ankObjIndex + "left";
            } else {
                ankClass = "right"+this.props.className;
                 cbid = "checkboxid" + "-" + this.props.entryIndex + "-" + this.props.ankObjIndex + "right";
                 cdid = "cdinputboxid" + "-" + this.props.entryIndex + "-" + this.props.ankObjIndex + "right";
            }
            
            console.log("---------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+ cbid)
            console.log("---------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@------------"+ cdid)
            return (
                <li className={ankClass} >
                    {this.props.entry.amount}: {this.props.entry.days} <input id={cbid} type = "checkbox" onClick={(e)=>this.props.onCheckboxClick(this.props.entryIndex, this.props.ankObjIndex, this.props.side , this.props.entry, e)} defaultChecked></input>
                    <input id={cdid} type="number" onChange={(e)=>this.props.changeOfAnkDays(this.props.entryIndex, this.props.ankObjIndex, this.props.side , this.props.entry, e)} defaultValue={this.props.cdvalue}/>
                </li>
                
            )
        }
    }
    class Entry extends React.Component {
        render(){
            if(this.props.entry){
                console.log("____________________-"+ this.props.entry.date)
                return (
                    <li>
                        <h3>
                            <strong>
                            {this.props.entry.amount}
                            </strong>
                                :  {this.props.entry.dd} - {this.props.entry.mm} - {this.props.entry.yyyy}
                                </h3>
                                <ul>
                                    {
                                        this.props.entry.ankObj.map((element, index)=>{
                                        return <AnkObj key={index} changeOfAnkDays={this.props.changeOfAnkDays} cdvalue={this.props.cdvalue} entryIndex={this.props.entryIndex} ankObjIndex={index} className="ankchild" side={this.props.side} entry={element} onCheckboxClick={this.props.onCheckboxClick}/>
                                        })
                                    }
                                </ul>
                                
                                {
                                    // if(this.props.entry.ankObj[0].amount){
                                // return this.props.entry.ankObj[0].amount;
                                // }

                            }
                            {/* <ul> */}
                                {/* {
                                    this.props.entry.ankObj.forEach(element => {
                                        console.log("-------------------------------"+ element)
                                        console.log(element.amount+"  "+element.days);
                                       return (
                                           "hjvjdvjfjbj"
                                        //    <li>
                                        //        chjchjvb
                                        //        {element.amount}: {element.days}
                                        //    </li>
                                       ) 
                                    })
                                } */}
                            {/* </ul> */}
                    </li>
                )
            } else {
                return null;
            }
            
        }
    }

    class EntryForm extends React.Component {
        render(){
            console.log("Hi I am working!!----RENDER()");
           var amtid=this.props.side+"amt";
           var ddid=this.props.side+"dd";
           var mmid=this.props.side+"mm";
           var yyyyid=this.props.side+"yyyy";
        return (
            <div>
            <form onSubmit={this.props.onsubmit} className={this.props.side}>
             Amount:
             <input id={amtid} type="number" size="9" maxLength="9" placeholder="000000"/><span>----></span>
            Date:
            <input id={ddid} typename="number" size="2" maxLength="2" placeholder="dd"/>-
            <input  id={mmid} typename="number" size="2" maxLength="2" placeholder="mm"/>-
            <input id={yyyyid} typename="number" size="4" maxLength="4" placeholder="yyyy"/>-
            <input type="submit"/>
            </form>
            
            </div>
        
            );
        }
    }


    class Oneside extends React.Component {
        // constructor(props){
        //     super(props);

        // }
        
        render() {
           if(!this.props.entries){
               return (
                <div>
                <EntryForm onsubmit={this.props.onsubmit} side={this.props.side}/>
                </div>
               )
           } else {
            return (
                <div>
                    <EntryForm onsubmit={this.props.onsubmit} side={this.props.side}/>
                        <ol>
                        {
                            this.props.entries.map((entry, index)=>{
                               return <Entry key={index} changeOfAnkDays={this.props.changeOfAnkDays} cdvalue={this.props.cdvalue} entry= {entry} entryIndex={index} side={this.props.side} onCheckboxClick={this.props.onCheckboxClick} />
                            })
                            // <Entry entries = {this.props.entry}/>
                        }
                        </ol>
                    
                    
                </div>
                )
           }
            
        }
    }


    class Main extends React.Component {
        constructor(props){
            super(props);
            this.state={entriesDebited: [], entriesCredited: [], date: new Date(), cashDiscountDays: 0};
            this.displayAndStore = this.displayAndStore.bind(this);
            this.calculateInterest = this.calculateInterest.bind(this);
            this.treatAsUTC = this.treatAsUTC.bind(this);
            this.sumofAllankObjs = this.sumofAllankObjs.bind(this);
            this.daysBetween = this.daysBetween.bind(this);
            this.setDateAndCD = this.setDateAndCD.bind(this);
            this.calculateInterestFinal = this.calculateInterestFinal.bind(this);
        }
        treatAsUTC(date) {
            var result = new Date(date);
            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
            return result;
        }
        
        daysBetween(startDate, endDate) {
            return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / 86400000;
        }
        sumofAllankObjs(arr){
            let sum =0
            arr.map(function(entry, index){
                console.log(entry.amount+":::::Days::"+entry.days);
                if(entry.flag){
                    sum = sum + (entry.amount * entry.days)/3000 ;
                }     
            })
            return sum;
        }
        calculateInterest(event){
            console.log("Hi, I am in the method calculateInterest!!!!---------------------------------------------!!!!!!!!!!!!");
            console.log(this.daysBetween("01-01-2018", new Date())); 
            var debits=[];
            // var debitAnk=[][];
            // var creditAnk=[][];
            var credits=[];
            this.state.entriesDebited.map((entry, index)=>{
                let temp = {};
                temp.amount=entry.amount;
                temp.ankObj=[];
                temp.type="debit";
                let dateObj = entry.mm+"-"+entry.dd+"-"+entry.yyyy;
                temp.date = new Date(dateObj);
                debits.push(temp);
            })
            this.state.entriesCredited.map((entry, index)=>{
                let temp = {};
                temp.amount=entry.amount;
                temp.ankObj=[];
                temp.type="credit";
                let dateObj = entry.mm+"-"+entry.dd+"-"+entry.yyyy;
                temp.date = new Date(dateObj);
                credits.push(temp);
            })
            debits.sort(function(a,b){
                var dateA = new Date(a.date), dateB = new Date(b.date);
                return dateA - dateB;
            })
            credits.sort(function(a,b){
                var dateA = new Date(a.date), dateB = new Date(b.date);
                return dateA - dateB;
            })
            var allEntries = debits.concat(credits);
            allEntries.sort(function(a, b){
                var dateA = new Date(a.date), dateB = new Date(b.date);
                return dateA - dateB;
             })
             //////////////////////------------ CHECK IF THIS IS REQUIRED ------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            //  let temp = {};
            //     temp.amount=0;
            //     temp.ankObj=[];
            //     temp.type="debit";
            //     temp.date = new Date();
            // allEntries.push(temp);
            // temp.type="credit";
            // allEntries.push(temp);
            ////////////////////////---------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>
            console.log("Here is the sorted TOTAL ENTRIES!!!!-----------");
            allEntries.map((entry, index)=>{
                entry.remaining = entry.amount;
                console.log("Entry: type:"+entry.type+"---"+entry.amount+":::"+entry.date + typeof(entry.remaining)+typeof(entry.amount));
            })

            // ------------------------------- Different approach -------------------------------------------------------------------

            allEntries.map(function(entry,index){
                if(entry.remaining === 0){
                    // Do nothing!!
                }
                else if(entry.type==="credit"){
                    console.log("--------------------entry.type==='credit'--------------------")
                    let i=index + 1;
                    while(i<allEntries.length){
                        if(entry.remaining === 0)
                            break;
                        else if(allEntries[i].type==="credit"){
                            i++ ;
                            // Do Nothing!!
                        } else {
                            if(entry.remaining >= allEntries[i].remaining){
                                let temp= {}, temp2 = {};
                                temp.amount =  allEntries[i].remaining;
                                temp.flag = 1;
                                temp.days = this.daysBetween(entry.date, allEntries[i].date);
                                entry.ankObj.push(temp);
                                temp2.amount = allEntries[i].remaining;
                                temp2.days = 0;
                                temp2.flag = 1;
                                allEntries[i].ankObj.push(temp2);
                                entry.remaining = entry.remaining - allEntries[i].remaining ;
                                allEntries[i].remaining = 0;
                                i++;
                            } else {
                                let temp = {}, temp2={};
                                temp.amount = entry.remaining;
                                temp.flag = 1;
                                temp.days = this.daysBetween(entry.date, allEntries[i].date);
                                entry.ankObj.push(temp);
                                temp2.amount = entry.remaining;
                                temp2.days = 0;
                                temp2.flag = 1;
                                allEntries[i].ankObj.push(temp2);
                                allEntries[i].remaining= allEntries[i].remaining - entry.remaining;
                                entry.remaining = 0;
                                break ;
                            }
                        }
                    } 
                } else {
                    let i= index +1;
                    while(i<allEntries.length){
                    if(entry.remaining === 0)
                        break;
                    else if(allEntries[i].type==="debit"){
                        i++ ;
                        // Do nothing!! 
                    } else {
                        if(entry.remaining >= allEntries[i].remaining){
                         //   var b = entry.remaining >= allEntries[i].remaining
                            var b= "3454">="100000";
                            console.log(entry.remaining+ "  "+allEntries[i].remaining+ b + typeof(entry.remaining) + typeof(allEntries[i].remaining))
                            let temp= {}, temp2={};
                            temp.amount =  allEntries[i].remaining;
                            console.log("========main yahan hun===========!!!!!!!!!!!!!!" + temp.amount)
                            temp.flag = 1;
                            temp.days = this.daysBetween(entry.date, allEntries[i].date);
                            entry.ankObj.push(temp);
                            temp2.amount = allEntries[i].remaining;
                            temp2.days = 0;
                            temp2.flag = 1;
                            allEntries[i].ankObj.push(temp2);
                            entry.remaining = entry.remaining - allEntries[i].remaining ;
                            allEntries[i].remaining = 0;
                            i++;
                        } else {
                            let temp = {}, temp2 = {};
                            temp.amount = entry.remaining;
                            console.log("========main yahan hun===========" + temp.amount)
                            temp.days = this.daysBetween(entry.date, allEntries[i].date);
                            temp.flag = 1;
                            entry.ankObj.push(temp);
                            temp2.amount = entry.remaining;
                            temp2.days = 0;
                            temp2.flag = 1;
                            allEntries[i].ankObj.push(temp2);
                            allEntries[i].remaining= allEntries[i].remaining - entry.remaining;
                            entry.remaining = 0;
                            break ;
                        }
                    }  
                    }

                }
            }.bind(this))
            //// odu vaad jehde v remaining reh gaye oste ajj takk da byaaj laa dao... bhaven debit bhaven credit
            allEntries.map(function(entry, index){
                if(entry.remaining != 0){
                    let temp ={};
                    // let today = new Date();
                    temp.amount = entry.remaining;
                    temp.flag = 1;
                    temp.days = this.daysBetween(entry.date, this.state.date);
                    entry.ankObj.push(temp);
                }
            }.bind(this))

            
            var finalCredit=[];
            var finalDebit=[];
            allEntries.forEach(element => {
                element.dd = element.date.getUTCDate()+1;
                element.mm = element.date.getUTCMonth()+1;
                console.log("----------------------------------------------------"+element.date.getUTCMonth());
                element.yyyy = element.date.getUTCFullYear();
                if(element.type==="credit"){
                    finalCredit.push(element);
                } else {
                    finalDebit.push(element);
                }
            });
            ///////////// lets see if it works!!!!!!!!!!!!!
            var interest = 0;
       //     console.log("CHECK IF ITS WORKING" + this.sumofAllankObjs(allEntries[0].ankObj))
            allEntries.map(function(entry, index){
                if(entry.type==="credit"){
                    interest= interest+this.sumofAllankObjs(entry.ankObj);
                }
                else {
                    interest= interest-this.sumofAllankObjs(entry.ankObj);
                }
            }.bind(this))
            this.setState({entriesDebited: finalDebit, entriesCredited: finalCredit}); 
            console.log("Interest Calculated is: "+interest);
            // ----------------------------------------------------------------------------------------------------------------------
            
            

        }
        calculateInterestFinal(){
            var interest = 0;
           this.state.entriesCredited.map(function(entry){
                interest=interest + this.sumofAllankObjs(entry.ankObj);
            }.bind(this))
            this.state.entriesDebited.map(function(entry){
                interest = interest - this.sumofAllankObjs(entry.ankObj);
            }.bind(this))
            console.log("========================================== Final interest is::::::: "+ interest)
         //   return interest;
        }
        displayAndStore(event){
            console.log("I am in displayAndStoreFunction()!!!!!!"+ event.target.className);
            console.log(event.target);
            // alert('A name was submitted: '+ document.getElementById("amt").value);
            event.preventDefault();
            var newEntry = {};
            if(event.target.className==="left"){
            console.log("==============@@@@@@@@@@@@@"+document.getElementById("leftamt").value + typeof(document.getElementById("leftamt").value))
            newEntry.amount= document.getElementById("leftamt").value*1;
            newEntry.dd= parseInt(document.getElementById("leftdd").value, 10);
            newEntry.mm= parseInt(document.getElementById("leftmm").value, 10);
            newEntry.yyyy= parseInt(document.getElementById("leftyyyy").value, 10);
            let dateObj = newEntry.mm+"-"+newEntry.dd+"-"+newEntry.yyyy;
            newEntry.date= new Date(dateObj);
            console.log("!!!!-------------------!!!!!!!!"+ newEntry.date);
            newEntry.ankObj = [];
            newEntry.remaining = newEntry.amount;
                this.setState({entriesDebited: this.state.entriesDebited.concat(newEntry)});            
            } else {
                console.log("==============@@@@@@@@@@@@@"+document.getElementById("leftamt").value + typeof(document.getElementById("leftamt").value))
                newEntry.amount= document.getElementById("rightamt").value*1;
                newEntry.dd= parseInt(document.getElementById("rightdd").value, 10);
                newEntry.mm= parseInt(document.getElementById("rightmm").value, 10);
                newEntry.yyyy= parseInt(document.getElementById("rightyyyy").value, 10);
                let dateObj = newEntry.mm+"-"+newEntry.dd+"-"+newEntry.yyyy;
                newEntry.date= new Date(dateObj);
                console.log("!!!!-------------------!!!!!!!!"+ newEntry.date);
                newEntry.ankObj = [];
                newEntry.remaining = newEntry.amount;
                this.setState({entriesCredited: this.state.entriesCredited.concat(newEntry)});            
            }
            console.log("Hi I am working!!"+newEntry.amount +typeof(newEntry.amount)+"   "+typeof(document.getElementById("rightamt").value));
            console.log("Hi I am working!!");
            if(this.state.entriesDebited[0]){
                console.log("Debit side yani left side entries::::"+this.state.entriesDebited[0].amount);
            }
            
            console.log("Credit side yani right side entries::"+this.state.entriesCredited);
            // alert('A name was submitted: '+ document.getElementById("amt").value);
            
        }
        setDateAndCD(e){
            console.log("--------------ENTERED setDateAndCD");
            e.preventDefault();
            if(document.getElementById("mm").value && document.getElementById("dd").value && document.getElementById("yyyy").value){
                let cddays = Number(document.getElementById("cddays").value);
                let dateStr = document.getElementById("mm").value+"-"+document.getElementById("dd").value+"-"+document.getElementById("yyyy").value;
                console.log(dateStr);
                let setdate = new Date(dateStr);
                this.setState({date: setdate, cashDiscountDays: cddays}, function(){
                console.log("--------------EXITED setDateAndCD" + this.state.date + this.state.cashDiscountDays);
                })
            }            
        }
        onCheckboxClick(entryIndex, ankObjIndex, side, entry, e){
            console.log("------------------------------------ old value of entry.flag"+ entry.flag);
            let id = "checkboxid" + "-" + entryIndex + "-" + ankObjIndex + side;
            console.log("checkbox clicked event triggered: " + document.getElementById(id).checked);
            entry.flag = document.getElementById(id).checked;
            console.log("new value of entry.flag:  "+ entry.flag);
            // let newState = [];
            // if(side==="left"){
                
            // } else {

            // }
        }
        changeOfAnkDays(entryIndex, ankObjIndex, side, entry, e){
            console.log("------------------------------------ old value of entry.days"+ entry.days);
            let id = "cdinputboxid" + "-" + entryIndex + "-" + ankObjIndex + side;
            console.log(document.getElementById(id).value)
            if(document.getElementById(id)){
                console.log("inputbox change event triggered: " + document.getElementById(id).value);
                entry.days = entry.days - document.getElementById(id).value;
            }
            console.log("new value of entry.days:  "+ entry.days);

        }
    render(){
    return (
        <Container>
        <div style={{textAlign: "center", marginBottom: "20px"}}>
        
            <label>Cash Discount:</label><input id="cddays" type="number" style={{marginRight: "75px"}}/>
            <label>Date:</label><input id="dd" typename="number" size="2" maxLength="2" placeholder="dd"/>-
            <input  id="mm" typename="number" size="2" maxLength="2" placeholder="mm"/>-
            <input id="yyyy" typename="number" size="4" maxLength="4" placeholder="yyyy"/>
            <button type="submit" onClick={this.setDateAndCD} style={{marginLeft: "25px"}} >Submit!</button>
            <br/>
            <div style={{fontSize: 40, marginTop: "15px"}}>
            <strong>
                {this.state.date.getDate()}-{this.state.date.getMonth()+1}-{this.state.date.getFullYear()}
            </strong> <br/> {this.state.cashDiscountDays}
            </div>
            
        
        <hr/>
        </div>
        <Container>
            
            <Row>
                <Col sm={6}>
                <Oneside entries={this.state.entriesDebited} changeOfAnkDays={this.changeOfAnkDays} cdvalue={this.state.cashDiscountDays} onsubmit={this.displayAndStore} onCheckboxClick={this.onCheckboxClick} side="left"/>
                </Col>
                <Col sm={6}>
                <Oneside entries={this.state.entriesCredited} changeOfAnkDays={this.changeOfAnkDays} cdvalue={this.state.cashDiscountDays} onsubmit={this.displayAndStore} onCheckboxClick={this.onCheckboxClick} side="right"/>
                </Col>
            </Row>
            <div style={{marginBottom: "100px"}} className="vl"></div>
            
            <div style={{textAlign: "center"}}>
            <button className="btn" onClick={this.calculateInterest} style={{marginRight: "75px"}}>Ank Calculation!!</button>
            <button className="btn" onClick={this.calculateInterestFinal}>Calculate Interest!!</button>
            </div>
        </Container>
        </Container>
          );
    }
    }
    // ========================================

    ReactDOM.render(
    <Main />,
    document.getElementById('root')
    );

