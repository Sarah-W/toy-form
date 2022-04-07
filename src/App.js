import logo from './logo.svg';
import './App.css';

function BlueDiv(){
  return <div className = "blue">I am a blue div</div> 
}


function AnimalForm(){

  return <></>
}

function ListMe(items){
  const list = items.map(item => <li key={item}>{item}</li>)
  return <ul> {list} </ul> 
}

const items= ["red","green","blue"]

function App() {
  return (
    <div className="App">
      <div className='container'>
        <BlueDiv></BlueDiv>
        <ListMe></ListMe>
      </div> 
    </div>
  );
}

export default App;
