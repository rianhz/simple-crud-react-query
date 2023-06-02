import { useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Contact } from "../../contact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteContact, fetchContacts } from "../../hooks/query";
import { PlusOutlined } from "@ant-design/icons";
import "./listContacts.css";
import ModalAddContact from "../../components/FormAddContact/FormAddContact";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ListContacts: React.FC = () => {
	const { Text } = Typography;
	const [open, setOpen] = useState(false);

	const [myPage, setMyPage] = useState(1);

	const client = useQueryClient();

	const {
		data: contacts,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["contacts"],
		queryFn: fetchContacts,
	});

	const deleteMutation = useMutation(deleteContact, {
		onSuccess: () => {
			client.invalidateQueries(["contacts"]);
			toast.success("Success delete contact!");
		},
		onError: (error) => {
			toast.error((error as any).message);
		},
	});

	if (isError) {
		return (
			<div>
				<h1>{(error as any).message}</h1>
			</div>
		);
	}

	const columns: ColumnsType<Contact> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			className: "actions-thead",
			render: (_, record: Contact) => (
				<Space
					size="middle"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Link to={`edit/${record.id}`}>Edit</Link>
					<Button onClick={() => deleteMutation.mutate(record.id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const onOpen = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Table
				title={() => (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text strong style={{ fontSize: "30px" }}>
							Contacts
						</Text>
						<Button
							style={{
								marginRight: 20,
							}}
							onClick={onOpen}
						>
							<PlusOutlined />
							Add
						</Button>
					</div>
				)}
				columns={columns}
				dataSource={contacts}
				rowKey={(record) => record.id}
				loading={isLoading}
				pagination={{
					current: myPage,
					pageSize: 5,
					total: contacts?.length,
					onChange(page) {
						setMyPage(page);
					},
					style: {
						position: "absolute",
						bottom: 0,
						right: 0,
					},
				}}
			/>

			<ModalAddContact open={open} onClose={onClose} />
		</>
	);
};

export default ListContacts;
