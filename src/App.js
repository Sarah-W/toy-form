import logo from './logo.svg';
import './App.css';

function BlueDiv(){
  return <div className = "blue">I am a blue div</div> 
}




function ListMe({items}){
  const list = items.map(item => <li key={item}>{item}</li>)
  return <ul> {list} </ul> 
}

function Select({labelid,labeltext,items}){
  console.log(items)
  const label = <label for={labelid}>{labeltext}</label>
  const options = items.map(item =>{ 
    return <option key={item} value={item}>
      {item} 
    </option>} 
  )
  return <>
    {label}
    <select id={labelid}>
      {options}
    </select>
  </>
}

function AnimalForm(){

  return <>
    <Select items={animals} labelid={"animal"} labeltext={"Select the type of your animal: "}></Select>
    <Select items={colours} labelid={"colour"} labeltext={"Select the colour of your animal: "}></Select>
  </>
}

const colours= ["Blue", "Green", "Red", "Black","Brown"]
const animals=[ "Bear","Tiger","Snake","Donkey"] 


function App() {
  return (
    <div className="App">
      <div className='container'>
        {/* <BlueDiv></BlueDiv>
        <ListMe items={myitems}></ListMe>
        <ListMe items={animals}></ListMe> */}
        <AnimalForm></AnimalForm>
      </div> 
    </div>
  );
}

export default App;
