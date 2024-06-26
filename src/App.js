import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import Input from './Input/Input'
import Output from './output/output'
import './App.css';
import { Spin } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined,YoutubeOutlined, InfoCircleOutlined, MailOutlined} from '@ant-design/icons';
import { Layout, Menu,Popover, Tag} from 'antd';

const { Header, Content, Footer } = Layout;

function App () {
  useEffect(() => {
    document.title = "Genome Sight"
 }, []);
  const doneUploadFile = useSelector((state) => state.featuresSelection.doneUploadFile)
  const currentPage = useSelector((state) => state.pagesRoutes.currentPage)

  const [numOfPage,setNumOfPage]=useState(1)

  const [displayInput,setDisplayInput]=useState(true)
  const [displayOutput,setDisplayOutput]=useState(false)
  const[fileMetaData, setFileMetaData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[accessionNumber, setAccessionNumber] = useState('');
  const[fileFromServer, setFileFromServer] = useState('');
  const[tabsHeader, setTabsHeader] = useState(['Organism Selection', 'Feature Selection', 'Analysis']);
  const[disableTabsHeader, setDisableTabsHeader] = useState({1:false,2:true,3:true});
  const [listOfCombinedFiles, setListOfCombinedFiles] = useState([]);
  const [geneFilter,setGeneFilter]=useState('')
  const [productDescription,setProductDescription]=useState('')
  const [excludedProductDescription,setExcludedProductDescription]=useState('')

  const saveExcludedProductDescription=(value)=>{
    setExcludedProductDescription(value)
  }
  const saveProductDescription=(value)=>{
    setProductDescription(value)
  }
  const saveGeneFilter=(value)=>{
    setGeneFilter(value)
  }
  const saveDisableTabsHeader=(value)=>{
    setDisableTabsHeader(value)
  }
  const increaseOrDecreaseNumOfPage=(value)=>{
    setNumOfPage(value)
  }
  const saveAccessionNumber=(accessionID)=>{
    setAccessionNumber(accessionID)
  }
  const saveFileFromServer=(fileFromServer)=>{
    setFileFromServer(fileFromServer)
  }
  const clickOnTab=(key)=>{
    increaseOrDecreaseNumOfPage(key)
  }
  return (

    <Layout className="layout">
     <div className="app" >
     <Header className="header">

     <Popover
     placement="bottomRight"
      content={<div> <YoutubeOutlined className="you-tube" style={{fontSize: '50px'}}/><iframe allow="fullscreen;" width="450" height="315" src="https://www.youtube.com/embed/2iEfVXLLS5k"></iframe></div>}
      title={<h1>Explanation About The Web</h1>}
      trigger="click"
      // visible={visible}
      // onVisibleChange={handleVisibleChange}
    >
     <QuestionCircleOutlined   className="help" style={{color: "white",  fontSize: '50px'}}/>
     </Popover>

     <Popover
      content={<div><h2> This tool was developed in the computational biology lab of  <a href="https://www.jce.ac.il/dr-noa-cohen/" target="_blank">Dr. Noa Cohen</a></h2> 
      
      <h2>By Adi Leibovich, Dor Yuran and Sarah Gingichashvili.</h2>
      <h2>Site template was take from <a href="https://ant.design"  target="_blank">Ant Design</a> website</h2>
      <h2><MailOutlined /> Contact us at <a href = "mailto: noace@jce.ac.il">noace@jce.ac.il</a></h2> </div>}
      title={<h2>About The Editors</h2>}
      trigger="click"
      // visible={visible}
      // onVisibleChange={handleVisibleChange}
    >
     <InfoCircleOutlined   className="about" style={{color: "white",  fontSize: '50px'}}/>
     </Popover>
     
    
      <div className="logo" onClick={() => window.location.reload()}></div>
      {/*<div className="logo" >Bioinformatics Web</div> */}
      <Menu theme="dark" className="menuApp" selectedKeys={currentPage} mode="horizontal" defaultSelectedKeys={['1']}>
        {tabsHeader.map((tab, index) => {
          const key = index + 1;
          return <Menu.Item key={key} disabled={disableTabsHeader[key]} onClick={()=>clickOnTab(key)}>{tab}</Menu.Item>;
        })}
      </Menu>
    </Header>
    <Content >

      <Input setExcludedProductDescription={saveExcludedProductDescription} excludedProductDescription={excludedProductDescription} geneFilter={geneFilter} productDescription={productDescription} saveProductDescription={saveProductDescription} saveGeneFilter={saveGeneFilter} listOfCombinedFiles={listOfCombinedFiles}  setListOfCombinedFiles={setListOfCombinedFiles} numOfPage={numOfPage} increaseOrDecreaseNumOfPage={increaseOrDecreaseNumOfPage} setDisableTabsHeader={saveDisableTabsHeader} disableTabsHeader={disableTabsHeader} fileMetaData={fileMetaData} accessionNumber ={accessionNumber} saveAccessionNumber = {saveAccessionNumber} setFileMetaData={setFileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayInput={displayInput} setDisplayInput={setDisplayInput} setDisplayOutput={setDisplayOutput}></Input>
      {isLoading && <Spin tip="Loading" indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} /> }
      {!isLoading && numOfPage === 3 && <Output excludedProductDescription={excludedProductDescription} productDescription={productDescription} geneFilter={geneFilter} listOfCombinedFiles={listOfCombinedFiles}  setListOfCombinedFiles={setListOfCombinedFiles} accessionNumber ={accessionNumber} setIsLoading={setIsLoading} setDisableTabsHeader={saveDisableTabsHeader} disableTabsHeader={disableTabsHeader} filesMetaData={fileMetaData} fileFromServer = {fileFromServer} saveFileFromServer ={saveFileFromServer} displayOutput={displayOutput}></Output>}
      </Content>
      <Footer className= "footer" style={{ textAlign: 'center' }}>Bioinformatics Web ©2022 Created by Adi Leibovich & Dor Iuran</Footer>

    </div>
    </Layout>
  );
}

export default App;
