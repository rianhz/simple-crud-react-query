import axios from "axios";
import { Contact } from "../contact";

export const fetchContacts = async () => {
	const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/contacts`);
	return res.data;
};

export const fetchContact = async (id: string) => {
	const res = await axios.get(
		`${import.meta.env.VITE_BASE_URL}/contacts/${id}`
	);

	return res.data;
};

export const addContact = async (val: Contact) => {
	const res = await axios.post(
		`${import.meta.env.VITE_BASE_URL}/contacts`,
		val
	);

	return res.data;
};
export const deleteContact = async (id: string) => {
	const res = await axios.delete(
		`${import.meta.env.VITE_BASE_URL}/contacts/${id}`
	);

	return res.data;
};

export const editContact = async (values: Contact) => {
	const res = await axios.put(
		`${import.meta.env.VITE_BASE_URL}/contacts/${values.id}`,
		{
			name: values.name,
			phone: values.phone,
		}
	);

	console.log(res);

	return res.data;
};
