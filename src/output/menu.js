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
    const [allFilesAndCompereFiles,setAllFilesAndCompereFiles]=useState({})

    useEffect(() => {
      let object ={}
      for(const file of props.unionAllFiles){
        object[file] ='file'
      }
      if(props.unionAllFiles.length > 1)
          object[props.unionAllFiles.join(' VS ')]='compere'
      setAllFilesAndCompereFiles(object)
      
    }, [])


  const toggleCollapsed = () => {
      setCollapsed(!collapsed)
  };

   const filesMetaDataMenuItem=()=>{
       return Object.keys(allFilesAndCompereFiles).map(fileName=>{
            return <Menu.Item key={fileName} icon={<FileTextOutlined/>}>
                {fileName}
           </Menu.Item>
       })
   }
  return (
    <div className='menu-div'>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          className="menu-files"
          defaultSelectedKeys={[props.unionAllFiles[0]]}
          defaultOpenKeys={[props.unionAllFiles[0]]}
          mode="inline"
          inlineCollapsed={collapsed}
          onClick={(key)=>props.setFileTabClickByTheUser(key.key,allFilesAndCompereFiles[key.key] )}
        >
          {allFilesAndCompereFiles && filesMetaDataMenuItem()}
        </Menu>
      </div>
  );
}

export default MenuFiles;
