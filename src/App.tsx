import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListContacts from "./pages/ListContacts/ListContacts";
import EditContact from "./pages/EditContact/EditContact";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<ListContacts />} />
				<Route path="edit/:contactID" element={<EditContact />} />
			</Routes>
		</>
	);
}

export default App;
