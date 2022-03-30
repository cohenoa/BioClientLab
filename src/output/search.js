import React from "react";
import { Button, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const getColumnSearchProps = (dataIndex, searchText,searchedColumn,saveSetSearchText, saveSetSearchedColumn ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, saveSetSearchText,
            saveSetSearchedColumn)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                saveSetSearchText,
                saveSetSearchedColumn
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>{
              handleReset(
                clearFilters,
                saveSetSearchText,
              )
              handleSearch(selectedKeys,confirm,
                dataIndex,
                saveSetSearchText,
                saveSetSearchedColumn)
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
 
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  
  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
    saveSetSearchText,
    saveSetSearchedColumn
  ) => {
    confirm();
    saveSetSearchText(selectedKeys[0]);
    saveSetSearchedColumn(dataIndex);
  };
  
  const handleReset = (clearFilters, saveSetSearchText) => {
    clearFilters();
    saveSetSearchText("");

  };
  


export default getColumnSearchProps;
