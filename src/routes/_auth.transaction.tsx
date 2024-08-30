import { createFileRoute } from "@tanstack/react-router";
import type { MenuProps, TableProps } from "antd";
import { Dropdown, Input, Space, Table, message } from "antd";
import { useEffect, useState } from "react";

import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  MinusCircleFilled,
  MoreOutlined,
  PauseCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useTransctionList } from "../api/transactions";
import { TransactionDataType } from "../types/transactionDataType.schema";
import { capitalize } from "../utils/utility";

export const Route = createFileRoute("/_auth/transaction")({
  component: () => TransactionLayout(),
});

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
      render: (_, record) => {
        return (
          <div className="capitalize">
            {capitalize(record["Sender Full Name"])}
          </div>
        );
      },
    },
    {
      title: "From Country",
      dataIndex: "Send Country",
      key: "send_country",
      render: (_, record) => {
        return (
          <div className="capitalize">{capitalize(record["Send Country"])}</div>
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
      render: (_, record) => {
        return (
          <div className="capitalize">
            {capitalize(record["Receiver Full Name"])}
          </div>
        );
      },
    },
    {
      title: "To Country",
      dataIndex: "Receive Country",
      key: "receive_country",
      render: (_, record) => {
        return (
          <div className="capitalize">
            {capitalize(record["Receive Country"])}
          </div>
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
            icon = (
              <CheckCircleFilled
                style={{ fontSize: "16px" }}
                className="text-green-400"
              />
            );
            break;
          case "Processing":
            icon = (
              <InfoCircleFilled
                style={{ fontSize: "16px" }}
                className="text-orange-400"
              />
            );
            break;
          case "Hold":
            icon = (
              <PauseCircleFilled
                style={{ fontSize: "16px" }}
                className="text-yellow-400"
              />
            );
            break;
          case "None":
            icon = (
              <MinusCircleFilled
                style={{ fontSize: "16px" }}
                className="text-red-400"
              />
            );
            break;
          default:
            icon = <ExclamationCircleFilled style={{ fontSize: "16px" }} />;
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
      <div className="mx-4 bg-white px-5 my-5 pt-3">
        <p className="my-3 text-md font-semibold">Transaction List</p>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
          placeholder="Search"
          prefix={<SearchOutlined className="text-gray-400" />}
        />
        <Table
          loading={isPending}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          scroll={{ x: 100 }}
          pagination={{
            pageSize: 6,
          }}
          style={{ overflowX: "auto" }}
        />
      </div>
    </>
  );
}

export default TransactionLayout;
