import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import listLogEntries from './API';

const App = () => {
	const [logEntries, setLogEntries] = useState([]);
	const [showPopup, setShowPopup] = useState({});
	const [addEntryLocation, setAddEntryLocation] = useState(null);
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 37.5577,
		longitude: 127.0001,
		zoom: 12,
	});

	useEffect(() => {
		(async () => {
			const logEntries = await listLogEntries();
			setLogEntries(logEntries);
		})();
	}, []);

	const showAddMarkerPopup = (event) => {
		const [longitude, latitude] = event.lngLat;

		setAddEntryLocation({
			latitude,
			longitude,
		});
	};

	return (
		<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/zillda/ckd9va80m0l5d1iny6wznmmzk"
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			onViewportChange={setViewport}
			onDblClick={showAddMarkerPopup}
		>
			{logEntries.map((entry) => (
				<>
					<Marker
						key={entry._id}
						latitude={entry.latitude}
						longitude={entry.longitude}
					>
						<div
							onClick={() =>
								setShowPopup({
									[entry._id]: true,
								})
							}
						>
							<img
								src="https://i.imgur.com/y0G5YTX.png"
								alt="maker"
								width="24"
								height="24"
							/>
						</div>
					</Marker>
					{showPopup[entry._id] ? (
						<Popup
							latitude={entry.latitude}
							longitude={entry.longitude}
							closeButton={true}
							closeOnClick={false}
							dynamicPosition={true}
							onClose={() => setShowPopup({})}
							anchor="bottom"
						>
							<div>
								<h3>{entry.title}</h3>
								<p>{entry.comments}</p>
								<small>
									Visited on : {new Date(entry.visitDate).toLocaleDateString()}
								</small>
							</div>
						</Popup>
					) : null}
				</>
			))}
			{addEntryLocation ? (
				<>
					<Marker
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
					>
						<div>
							<img
								src="https://i.imgur.com/y0G5YTX.png"
								alt="maker"
								width="24"
								height="24"
							/>
						</div>
					</Marker>
					<Popup
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
						closeButton={true}
						closeOnClick={false}
						dynamicPosition={true}
						onClose={() => setAddEntryLocation(null)}
						anchor="bottom"
					>
						<div>
							<h3>Add entry</h3>
						</div>
					</Popup>
				</>
			) : null}
		</ReactMapGL>
	);
};

export default App;
