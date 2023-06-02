import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { editContact, fetchContact, fetchContacts } from "../../hooks/query";
import { useNavigate, useParams } from "react-router-dom";
import { Contact } from "../../contact";

const FormEditContact: React.FC = () => {
	const [form] = Form.useForm();

	const navigate = useNavigate();
	const client = useQueryClient();

	const { contactID } = useParams();

	const { data: contactData } = useQuery({
		queryKey: ["getEditedContact", contactID],
		queryFn: () => fetchContact(contactID as any),
		retryOnMount: true,
	});

	const editMutation = useMutation(editContact, {
		onSuccess: () => {
			client.invalidateQueries(["contacts"]);
			toast.success("Edit contact success!");
			navigate("/");
		},
		onError: (error) => {
			toast.error((error as any).message);
		},
	});

	const editContactExecute = (values: Contact) => {
		const body = {
			...values,
			id: contactData?.id,
		};

		editMutation.mutate(body);
	};

	// console.log(contactData);
	// console.log(contactID);
	// console.log(form.getFieldsValue());
	const { data: contact } = useQuery({
		queryKey: ["contacts"],
		queryFn: fetchContacts,
		select: (data: Contact[]) => data.find((el) => el.id === contactID),
		onError: (err: any) => toast.error(err.message),
	});

	return (
		<>
			<Toaster />
			<Form
				form={form}
				onFinish={editContactExecute}
				initialValues={{
					name: contact?.name,
					phone: contact?.phone,
				}}
			>
				<Form.Item name="name" label="Name">
					<Input type="text" placeholder="Enter the name" />
				</Form.Item>
				<Form.Item name="phone" label="Phone">
					<Input type="number" placeholder="Enter phone number ..." />
				</Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					loading={editMutation.isLoading}
					style={{
						display: "block",
						marginLeft: "auto",
					}}
				>
					Save
				</Button>
			</Form>
		</>
	);
};

export default FormEditContact;
