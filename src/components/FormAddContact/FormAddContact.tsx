import { Button, Form, Input, Modal } from "antd";
import { toast, Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContact } from "../../hooks/query";
import { Contact } from "../../contact";
import "./modalForm.css";

interface ModalFormI {
	open: boolean;
	onClose: () => void;
}

const ModalAddContact: React.FC<ModalFormI> = ({ open, onClose }) => {
	const [form] = Form.useForm();

	const client = useQueryClient();

	const addContactMutation = useMutation(addContact, {
		onSuccess: () => {
			client.invalidateQueries(["contacts"]);
			toast.success("Success adding new contact!");
			form.resetFields();
			onClose();
		},
		onError(error) {
			toast.error((error as any).message);
		},
	});

	const handleAddContact = (values: Contact) => {
		addContactMutation.mutate(values);
	};

	return (
		<>
			<Toaster />
			<Modal open={open} title="Add Contact" onCancel={onClose}>
				<Form form={form} onFinish={handleAddContact}>
					<Form.Item
						name="name"
						label="Name"
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
						style={{
							display: "block",
							marginLeft: "auto",
						}}
					>
						Add
					</Button>
				</Form>
			</Modal>
		</>
	);
};

export default ModalAddContact;
