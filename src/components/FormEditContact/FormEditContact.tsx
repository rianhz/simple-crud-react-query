import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { editContact } from "../../hooks/query";
import { useNavigate } from "react-router-dom";
import { Contact } from "../../contact";

interface FormEditI {
	contact: {
		id: string;
		name: string;
		phone: number;
	};
}

const FormEditContact: React.FC<FormEditI> = ({ contact }) => {
	const [form] = Form.useForm();

	const navigate = useNavigate();
	const client = useQueryClient();

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
			id: initialValue?.id,
		};

		editMutation.mutate(body);
	};

	const initialValue = {
		id: contact?.id,
		name: contact?.name,
		phone: contact?.phone,
	};

	return (
		<>
			<Toaster />
			<Form form={form} onFinish={editContactExecute}>
				<Form.Item
					name="name"
					label="Name"
					initialValue={initialValue.name}
					rules={[
						{
							validator: (_, values) => {
								return new Promise((resolve, reject) => {
									if (values === undefined) {
										reject("Name is required");
									} else if (values.length < 2) {
										reject("Name should more than 3 character");
									} else {
										resolve("");
									}
								});
							},
						},
					]}
				>
					<Input type="text" placeholder="Enter the name" />
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone"
					initialValue={initialValue.phone}
					rules={[
						{
							validator: (_, values) => {
								return new Promise((resolve, reject) => {
									if (values === undefined) {
										reject("Phone field cant be empty");
									} else if (values.length < 10) {
										reject("Phone should more than or 10 character");
									} else {
										resolve("");
									}
								});
							},
						},
					]}
				>
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
