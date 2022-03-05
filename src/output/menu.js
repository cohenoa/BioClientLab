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






function MenuFiles (props) {
    const { SubMenu } = Menu;
    const [collapsed,setCollapsed]=useState(false)


    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    };


   const filesMetaDataMenuItem=()=>{
       return props.filesMetaData.map(file=>{
        // console.log(file.name);

            return <Menu.Item key={file.name}  icon={<FileTextOutlined/>}>
                {file.name}
           </Menu.Item>
       })
   }
  return (
    <div style={{ width: 256 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={[props.filesMetaData[0].name]}
          defaultOpenKeys={[props.filesMetaData[0].name]}
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
