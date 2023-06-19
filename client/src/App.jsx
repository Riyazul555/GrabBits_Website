
import { React, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {Contact,Footer,	Navbar,	Team, Opportunities, Hidden,
	Podcast, GoToTop, Username, Register, Password, Profile, 
	Recovery, Reset, PageNotFound, Grabby
} from './components';
import { Loader, Popup } from './components/common';
import { FourOhFour } from './pages/FourOhFour/FourOhFour';
import ReactGA from 'react-ga4';
import { Homepage, Login, Signup } from './pages';
import './App.css';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

ReactGA.initialize('G-PG8HC34H6V');
import PropagateLoader from 'react-spinners/PropagateLoader';
const App = () => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);
	return (
		<div>
			{loading ? (
				<div className="load">
					<PropagateLoader
						loading={loading}
						aria-label="Loading Spinner"
						data-testid="loader"
						color={'#7541c8'}
						className="loader"
					/>{' '}
					<h1 className="loader1" style={{position : 'relative' , top: '-10%', fontSize : '74px'}}>Welcome to GrabBit !!</h1>
				</div>
			) : (
				<>
					{/* <div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: '50px',
					margin: '100px 0',
				}}
			> */}

					<GoToTop />
					<Popup />
					<Navbar />
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/team" element={<Team />} />
						<Route path="/opportunities" element={<Opportunities />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/podcasts" element={<Podcast />} />
						<Route path="/hidden" element={<Hidden />} />
						<Route path="/resources" element={<Hidden />} />
						<Route path="/grabby" element={<Grabby />} />
						{/* <Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} /> */}
						{/* <Route path="*" element={<FourOhFour />} /> */}
						{/* login trial */}
						<Route path="/register" element={<Register />} />
						<Route path="/getstarted" element={<Username />} />
						<Route
							path="/password"
							element={
								<ProtectRoute>
									<Password />
								</ProtectRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<AuthorizeUser>
									<Profile />
								</AuthorizeUser>
							}
						/>
						<Route path="/recovery" element={<Recovery />} />
						<Route path="/reset" element={<Reset />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
					<Footer />
					{/* <Input />

			<Button label="Search for Jobs" />*/}
					{/* <Card /> */}
					{/* </div> */}
				</>
			)}
		</div>
	);
};

export default App;
