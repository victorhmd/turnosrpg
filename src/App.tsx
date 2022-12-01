import CharList from './components/charList/CharList';

const App = () => (
  <div className='container p-5'>
    <div className="row">
      <div className="col-4">
        <CharList render={1}></CharList>
      </div>
      <div className="col-4 text-center">
        <h1>LISTA FINAL</h1>
      </div>
      <div className="col-4">
        <CharList render={2}></CharList>
      </div>
    </div>
  </div>
)

export default App;