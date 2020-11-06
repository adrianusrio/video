import logo from './logo.svg';
import './App.css';
import Video from './Video';

function App() {
	let app1 = App1();
	console.log('app1'+ app1)
	console.log(asd);
	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
				Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
				>
				Learn React
				</a>
			</header> */}
			<Video></Video>
		</div>
	);
}

const asd = 1;

function App1(){
	let asd = 2;
	return asd;
}

export default App;