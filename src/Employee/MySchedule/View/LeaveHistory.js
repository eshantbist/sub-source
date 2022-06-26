import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Matrics, Colors, Fonts } from '@Assets'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { Images } from '@Assets'
import { Modal } from 'react-native';
import { Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Linking } from 'react-native';
import { LoadWheel } from "@Components";

const LeaveHistory = (props) => {
    const [tableData, setTableData] = useState([]);
    const [currentNotes, setCurrentNotes] = useState('')
    const [showNotesModal, setShowNotesModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const tableHead = ['Dates Requested', 'Reason', 'Notes', 'Status', 'Attachment', 'Action']

    const formatTableData = (response) => {
        const leaveList = response?.Basic?.Data
        let formattedLeaveList = []
        const arrKeys = leaveList.map(el => el.TimeOffCombineID);
        for(let i=0;i<leaveList?.length;i++){
          const leave = leaveList[i]
          const { TimeOffStatusName, ReasonName, ReasonDetail, TimeOffStatusID, CreatedByFirstName, CreatedByMiddleName, CreatedByLastName, AttachmentFilePath, TimeOffDate, TimeOffCombineID } = leave
          let tempList = [];
          const lastIndex = arrKeys.lastIndexOf(TimeOffCombineID);
          tempList[0] = `${moment(leaveList[lastIndex]?.TimeOffDate).format('MM/DD/YYYY')} - ${moment(TimeOffDate).format('MM/DD/YYYY')}`
          i=lastIndex
          tempList[1] = ReasonName
          tempList[2] = ReasonDetail
          if(TimeOffStatusID === 2 && CreatedByFirstName){
            tempList[3] = `${TimeOffStatusName} by ${CreatedByFirstName} ${CreatedByMiddleName} ${CreatedByLastName}`
          }else{
            tempList[3] = TimeOffStatusName
          }
          tempList[4]=AttachmentFilePath
          tempList[5]=TimeOffCombineID
          formattedLeaveList.push(tempList)
        }
        setTableData(formattedLeaveList)
    }

    const deleteLeave = (TimeOffCombineID) =>{
      setLoading(true);
      fetch(`https://testapi.subsource.com/DeleteEmployeeTimeOff/${TimeOffCombineID}`,{ 
            method: 'GET', 
            headers: new Headers({
            'Authorization': 'Bearer ' + global.user.access_token,
            'Content-Type': 'application/json'
            })
          }).then(json => json.json()) 
        .then(function(response) {
            getTimeOff();
          }).catch((error) => {
            console.warn(error)
            console.error(error);
          });
    }

    const getTimeOff = async () => {
      setLoading(true)
          const UserStoreGuid = userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
          fetch(`https://testapi.subsource.com/GetEmployeeTimeOff/?UserStoreGuid=${UserStoreGuid}&TimeOffCombineID=0&PageNumber=1&PageSize=20&AbsenceTypeID=-1&RangeTypeID=-1`,{ 
            method: 'GET', 
            headers: new Headers({
            'Authorization': 'Bearer ' + global.user.access_token,
            'Content-Type': 'application/json'
            })
          }).then(json => json.json()) 
        .then(function(response) {
            formatTableData(response)
            setLoading(false)
          }).catch((error) => {
            console.error(error);
          });
    }

    useEffect(()=>{
        getTimeOff()
    },[])

    const getNotes = (note) => {
      return(
        !!note? <TouchableOpacity onPress={()=>{
          setCurrentNotes(note)
          setShowNotesModal(true)
        }}>
          <Image source={Images.NotesIcon} style={{height:24, width:24}}/>
        </TouchableOpacity>:null
      )
    }

    const getCellData = (index, cellData, date) => {
      switch(index){
        case 2:
          return getNotes(cellData)
        case 4:
            return(
              !!cellData?<TouchableOpacity onPress={()=>{
                Linking.openURL(cellData)
              }} style={{marginLeft:10}}>
                <Image source={Images.AttachmentIcon} style={{height:24, width:24}}/>
              </TouchableOpacity>:null
            )
        case 5:
          return(
            moment(date.split('-')[0], 'MM/DD/YYYY').diff(moment()) >= 0 && <TouchableOpacity onPress={()=>deleteLeave(cellData)}>
                <Text style={{textDecorationLine:"underline", color:'red', marginLeft:10}}>Delete</Text>
            </TouchableOpacity>
          )
        default:
          return cellData || ''
      }
    }

    const widthArr = [200, 200, 100, 200, 100, 100]
    
    return (
      <>
        <Modal visible={showNotesModal} transparent>
          <TouchableWithoutFeedback onPress={()=>{
            setShowNotesModal(false)
          }}>
          <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)", justifyContent:"center", alignItems:"center"}}>
            <View style={{backgroundColor:'white', padding:20, borderRadius:5, minHeight:200, minWidth:200, justifyContent:"center", alignItems:"center"}}>
            <Text>{currentNotes}</Text>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={{flex:1, backgroundColor:'white', paddingHorizontal:10}}>
          <View style={{flexDirection:"row", marginVertical:20}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack()
                }}>
                <Image source={Images.EmpBackIcon} style={{height:20, width:20}} resizeMode="contain"></Image>

            </TouchableOpacity>
            <Text style={{fontSize:16, fontWeight:'600', marginLeft:20}}>Leave History</Text>
          </View>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={tableHead} widthArr={widthArr} style={{height: Matrics.CountScale(40),  
    backgroundColor: '#979797' }} textStyle={{textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: Fonts.NunitoSansRegular,
    flexWrap: 'wrap',
    marginTop: Matrics.CountScale(10)}}/>
            </Table>
            <ScrollView>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={{flexDirection: 'row'}}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={getCellData(cellIndex, cellData, rowData[0])} textStyle={{margin: 6}} style={{width:widthArr[cellIndex]}}/>
                        ))
                      }
                    </TableWrapper>
                      ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <LoadWheel visible={loading} />
      </>
    )
}

export default LeaveHistory
