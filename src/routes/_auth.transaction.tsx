import { createFileRoute } from "@tanstack/react-router";
import type { MenuProps, TableProps } from "antd";
import { Dropdown, Input, Space, Table, message } from "antd";
import { useEffect, useState } from "react";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  MinusCircleFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { useTransctionList } from "../api/transactions";
import { capitalize } from "../utils/utility";

export const Route = createFileRoute("/_auth/transaction")({
  component: () => TransactionLayout(),
});

interface TransactionDataType {
  id: string;
  "Sender Full Name": string;
  "Receiver Full Name": string;
  "Current Status": string;
  "Send Amount": string;
  "Send Country": string;
  "Receive Amount": string;
  "Receive Country": string;
}

function TransactionLayout() {
  const {
    mutate: generateTransaction,
    isPending,
    data: transctionlist,
  } = useTransctionList();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<TransactionDataType[]>([]);

  const filteredData = data.filter((item) => {
    return (
      item["Sender Full Name"].toLowerCase().includes(search.toLowerCase()) ||
      item["Receiver Full Name"].toLowerCase().includes(search.toLowerCase()) ||
      item["Current Status"].toLowerCase().includes(search.toLowerCase()) ||
      item["Send Country"].toLowerCase().includes(search.toLowerCase()) ||
      item["Receive Country"].toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, "Current Status": newStatus } : item
      )
    );
    message.success(`Transaction updated to ${newStatus}`);
  };

  const columns: TableProps<TransactionDataType>["columns"] = [
    {
      title: "Sender",
      dataIndex: "Sender Full Name",
      key: "sender_full_name",
      render: (_, row) => {
        return (
          <div className="capitalize">
            {capitalize(row["Sender Full Name"])}
          </div>
        );
      },
    },
    {
      title: "From Country",
      dataIndex: "Send Country",
      key: "send_country",
      render: (_, row) => {
        return (
          <div className="capitalize">{capitalize(row["Send Country"])}</div>
        );
      },
    },
    {
      title: "Sent Amount",
      dataIndex: "Send Amount",
      key: "send_amount",
    },
    {
      title: "Receiver",
      dataIndex: "Receiver Full Name",
      key: "receiver_full_name",
      render: (_, row) => {
        return (
          <div className="capitalize">
            {capitalize(row["Receiver Full Name"])}
          </div>
        );
      },
    },
    {
      title: "To Country",
      dataIndex: "Receive Country",
      key: "receive_country",
      render: (_, row) => {
        return (
          <div className="capitalize">{capitalize(row["Receive Country"])}</div>
        );
      },
    },
    {
      title: "Received Amount",
      dataIndex: "Receive Amount",
      key: "receive_amount",
    },
    {
      title: "Status",
      dataIndex: "Current Status",
      key: "current_status",
      render: (_, row) => {
        let icon;
        switch (row?.["Current Status"]) {
          case "Authorized":
            icon = <CheckCircleFilled className="text-green-400" />;
            break;
          case "Processing":
            icon = <InfoCircleFilled className="text-yellow-400" />;
            break;
          case "Hold":
            icon = <CloseCircleFilled className="text-red-400" />;
            break;
          case "None":
            icon = <MinusCircleFilled className="text-gray-400" />;
            break;
          default:
            icon = <ExclamationCircleFilled />;
        }

        return (
          <span className="flex items-center">
            {icon}
            <span className="ml-2">{row["Current Status"]}</span>
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const status = record?.["Current Status"];

        let items: MenuProps["items"] = [];

        if (status === "Processing") {
          items = [
            {
              label: "Hold",
              key: "0",
              onClick: () => handleStatusChange(record.id, "Hold"),
            },
            {
              label: "Authorized",
              key: "1",
              onClick: () => handleStatusChange(record.id, "Authorized"),
            },
          ];
        } else if (status === "Hold") {
          items = [
            {
              label: "Authorized",
              key: "0",
              onClick: () => handleStatusChange(record.id, "Authorized"),
            },
          ];
        } else if (status === "Authorized") {
          items = [
            {
              label: "None",
              key: "0",
              onClick: () => handleStatusChange(record.id, "None"),
            },
          ];
        } else if (status === "None") {
          items = [];
        }

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreOutlined />
              </Space>
            </a>
          </Dropdown>
        );
      },
    },
  ];

  useEffect(() => {
    generateTransaction();
  }, [generateTransaction]);

  useEffect(() => {
    if (transctionlist?.data?.data) {
      setData(transctionlist.data.data);
    }
  }, [transctionlist]);

  return (
    <>
      <div className="px-5">
        <h1 className="my-5">Transaction List</h1>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
          placeholder="Search"
        />
        <Table
          loading={isPending}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 7,
          }}
        />
      </div>
    </>
  );
}

export default TransactionLayout;
