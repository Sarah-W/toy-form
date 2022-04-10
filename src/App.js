import './App.scss';
import { useState } from "react";

function Select({labelid,labeltext,items,state}){
  let [selected,setSelected] = state
  function changeHandler(e){
    setSelected(e.target.value)
  }
  const label = <label htmlFor={labelid}>{labeltext}</label>
  const options = items.map(item =>{ 
    return <option key={item} value={item}>
      {item} 
    </option>} 
  )
  return <div className='textinput'>
    {label}
    <select id={labelid} defaultValue='' onChange={changeHandler}>
      <option disabled value=''>Choose Colour</option>
      {options}
    </select>
  </div>
}

function ValidEmail({state}){
  let [email,setEmail]=state

  function changeHandler(e){
    //using the validity checking of the email form element itself. 
    //We could do something stricter using regex if we felt the need.
    //Browsers do do this differently - some just look for the @, some look for @ and .
    //I have this firing on change, it might be better to do it on blur or on a keystroke of enter.

    if(e.target.checkValidity()){
      setEmail({value:e.target.value,valid:true})
    } else {
      setEmail({value:e.target.value,valid:false})
    }
  }
  return<>
  <div className='textinput'>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" onChange={changeHandler} placeholder='foo@bar.com'></input>
  </div>
  <div className='error'>
    {email.valid? ' ':'*Email is not valid'}
  </div>
  </>
}

function ValidPassword({state}){
  let [pwd,setPwd]=state
  function changeHandler(e){
    if(e.target.value.length < 8){
      setPwd({value:e.target.value,valid:false,message:"Password is too short."})
    } else {
      setPwd({value:e.target.value,valid:true,message:"Password is good."})
    }
  }
  return<>
  <div className='textinput'>
    <label htmlFor="pass">Password:</label>
    <input type="password"  id="pass" onChange={changeHandler}></input>
  </div>
    <div className='error'>
    {(pwd.valid || pwd.value.length == 0 ) ? ' ':`*${pwd.message}`}
  </div>
  </>
}

function CheckBoxGroup({items,title,state}){
  let itemDict = {} 
  items.forEach(item => itemDict[item]=false)
  let [checkedState,setCheckedState]=useState(itemDict)
  let [selected,setSelected] = state
  const checkHandler = (item)=>{
    checkedState[item]=!checkedState[item]
    setCheckedState(checkedState)
    let _selected = Object.entries(checkedState).filter(d=>d[1]).map(d=>d[0])
    setSelected(_selected)
  }
  const boxes = items.map(item=>{
    return <span key={item}>
      <input type="checkbox" id={item} name={item} value={item} onChange={()=>checkHandler(item)}></input>
      <label htmlFor={item}> {item}</label>
    </span>
  })
  return <div className='checkboxlist'>
    {title} 
    {boxes}
    </div>
}

function TigerType({state}){
  let [tigerType,setTigerType] = state
  //I was in two minds as to whether to make TigerType its own component, 
  //as the potential for re-use is low but I think it does make AnimalForm tidier and more consistant 
  //to do it this way

  function changeHandler(e){
    setTigerType(e.target.value)
  }

  return<>
    <p>You have a tiger, and a tiger must have a tiger type. What type is your tiger?</p>
    <div className='textinput'>
      <label htmlFor="tigertype">Tiger Type: </label>
      <input type="text" id="tigertype" placeholder="e.g. Fierce " onChange={changeHandler}></input>
    </div>
  </>
}

function AnimalForm(){
  let [email,setEmail]=useState({value:'',valid:true,message:""})
  let [pwd,setPwd]=useState({value:'',valid:false,message:""})
  let [selectedAnimals,setSelectedAnimals]=useState([])
  let [selectedColour,setSelectedColour]=useState("")
  let [tigerType,setTigerType]=useState("")


  function form_is_valid(){
    //filthy hack, uses all sorts of coerce to boolean.
    let tigertype = selectedAnimals.find(d=>d==="Tiger") ? !!tigerType.length : true
    return email.value.length && email.valid && pwd.valid && selectedAnimals.length && tigertype 
  }

  //each of these components is pretty generic apart from TigerType - supply a list and some text and such, and you're good to go.
  return <div className='animalform'>
    <form className='form'>
      <h2>Contact Form</h2>
      <ValidEmail state={[email,setEmail]}></ValidEmail>
      <ValidPassword state={[pwd,setPwd]}></ValidPassword>
      <Select items={colours} labelid={"colour"} labeltext={"Select your colour: "} state={[selectedColour,setSelectedColour]} ></Select>
      <CheckBoxGroup items={animals} title = {"Choose your animals:"}state={[selectedAnimals,setSelectedAnimals]} ></CheckBoxGroup>
      {selectedAnimals.find(d=>d==="Tiger")?<> 
        <TigerType state={[tigerType,setTigerType]}></TigerType>
        </> : <></>
      }
      <button>Submit</button>
    </form>
    <div className='result'>
    <h2>Result</h2>
      {/* this just shows the state of our form at the moment. 
      Its pretty primitive but it could form the basis of a block style error message */}
      <p>Email: {email.valid ? email.value : email.message}</p>
      <p>Password: {pwd.message}</p>
      <p>Selected colour: {selectedColour}</p>
      <p>Selected animals: {selectedAnimals.length ? selectedAnimals.join(", ") :'No animals yet'}</p>
      <p>Type of Tiger: {selectedAnimals.find(d=>d==="Tiger") ? tigerType:'Tiger type is not required'}</p>

      {form_is_valid() ? <p className='good'>You're good to go!</p> : <p className='warn'>Something is wrong.</p>} 

    </div>  
  </div>
}

const colours= ["Blue", "Green", "Red", "Black","Brown"]
const animals=[ "Bear","Tiger","Snake","Donkey"] 

function App() {
  return (
    <div className="App">
      <div className='container'>
        <AnimalForm></AnimalForm>
      </div> 
    </div>
  );
}

export default App;
