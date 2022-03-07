import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { logDOM } from "@testing-library/dom";






function MenuFiles (props) {
    const { SubMenu } = Menu;
    const [collapsed,setCollapsed]=useState(false)


  const toggleCollapsed = () => {
      setCollapsed(!collapsed)
  };

   const filesMetaDataMenuItem=()=>{
       return props.unionAllFiles.map(fileName=>{
            return <Menu.Item key={fileName} icon={<FileTextOutlined/>}>
                {fileName}
           </Menu.Item>
       })
   }
  return (
    <div style={{ width: 256 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={[props.unionAllFiles[0]]}
          defaultOpenKeys={[props.unionAllFiles[0]]}
          mode="inline"
          inlineCollapsed={collapsed}
          onClick={(key)=>props.setFileTabClickByTheUser(key.key)}
        >
          {filesMetaDataMenuItem()}
        </Menu>
      </div>
  );
}

export default MenuFiles;
