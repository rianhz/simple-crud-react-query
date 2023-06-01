import { useParams } from "react-router-dom";
import FormEditContact from "../../components/FormEditContact/FormEditContact";
import { useQuery } from "@tanstack/react-query";
import { fetchContact } from "../../hooks/query";

const EditContact = () => {
	const { contactID } = useParams();

	const { data } = useQuery({
		queryKey: ["contact", contactID],
		queryFn: () => fetchContact(contactID as any),
	});

	return (
		<>
			<FormEditContact contact={data} />
		</>
	);
};

export default EditContact;
