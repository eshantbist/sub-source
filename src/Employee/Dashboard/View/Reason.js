// //LIBRARIES
// import React from 'react';
// import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
// import CheckBox from "react-native-check-box";
// import { connect } from 'react-redux';

// //ASSETS
// import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from "@Assets";
// import { getTimeOffReasons } from '@Redux/Actions/DashboardEmployeeActions'

// //====CLASS DECLARATION====//
// class Reason extends React.Component {
//   //--------->>>State Initilization----------->>>

//   state = {
//     FlatListData: [
//       {
//         ReasonName: "Moving",
//         ReasonName: "Changing Career path/goals",
//       }
//     ],
//     selectedIndex: ''
//   };

//   //------------>>>LifeCycle Methods------------->>>

//   componentWillMount() {
//     console.log(this.props, "reasons");
//     // this.props.getTimeOffReasons();
//     this.setState({ FlatListData: '' })
//   }

//   //------------->>>Controllers/Functions------------>>>>

//   async componentWillReceiveProps(nextProps) {
//     clearTimeout(this.state.clearId)
//     console.log(nextProps, "PropsReason");
//     if (nextProps.reasons.reasonsSuccess) {
//       this.setState({ FlatListData: nextProps.reasons.data.Data })
//     }
//   }

//   renderReason = ({ item, index }) => {
//     console.log(item);

//     return (
//       <TouchableOpacity onPress={async () => { await this.setState({ selectedIndex: index }) }}>
//         <View style={Styles.reasonContainer}>
//           <Text style={Styles.reasonText}>
//             {item.ReasonName}
//           </Text>
//           <View style={{ justifyContent: 'flex-end', }}>
//             <Image source={this.state.selectedIndex == index ? Images.checkMark : undefined} style={{ height: 10, width: 10, }} />
//           </View>

//         </View>
//       </TouchableOpacity>
//     )
//   }

//   //----------->>>Render Method-------------->>>
//   render() {
//     return (
//       <View style={Styles.pageBody}>
//         {/* ====>>>>>>>>>>> Header start <<<<<<<<<<==========> */}

//         <View style={MasterCssEmployee.headerContainer}>
//           <TouchableOpacity
//             onPress={() => {
//               this.props.navigation.goBack();
//             }}
//             style={MasterCssEmployee.leftStyle}
//           >
//             <Text style={MasterCssEmployee.leftTextStyle}>Cancel</Text>
//           </TouchableOpacity>
//           <View style={MasterCssEmployee.centerStyle}>
//             <Text style={MasterCssEmployee.centerTextStyle}>Reason</Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => {
//               this.props.navigation.navigate('Signature');
//             }}
//             style={MasterCssEmployee.rightStyle}
//           >
//             <Text style={MasterCssEmployee.rightTextStyle}>Done</Text>
//           </TouchableOpacity>
//         </View>
//         {/* ====>>>>>>>>>>> Header End <<<<<<<<<<==========> */}

//         {this.renderPageContent()}
//       </View>
//     );
//   }

//   // ====>>>>>>>>>>> Page Content <<<<<<<<<<==========>
//   renderPageContent() {
//     return (
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={this.state.FlatListData}
//           renderItem={this.renderReason}
//           //contentContainerStyle={styles.FlatListStyle}
//           ItemSeparatorComponent={() => <View style={{ borderWidth: 0.8, borderColor: Colors.LIGHTGREY }} />}
//         />
//       </View>
//     );
//   }
// }

// /* ====>>>>>>>>>>> Styles <<<<<<<<<<==========> */

// const Styles = {
//   pageBody: {
//     flex: 1,
//     backgroundColor: Colors.WHITE
//   },
//   reasonContainer: {
//     flex: 1,
//     marginVertical: Matrics.CountScale(10),
//     flexDirection: 'row',
//     marginHorizontal: Matrics.CountScale(10)
//   },
//   reasonText: {
//     fontSize: Matrics.CountScale(16),
//     flex: 1,
//     fontFamily: Fonts.NunitoSansRegular,
//     color: Colors.BLACK
//   },
//   borderView: {
//     borderBottomColor: Colors.LIGHTGREY,
//     borderBottomWidth: 0.8
//   }
// }
// // export default Reason;

// const mapStateToProps = (state) => {
//   console.log(state, "sstates");

//   return {
//     reasons: state.DashboardEmployee,
//   };
// }
// //Redux Connection  
// export default connect(mapStateToProps, { getTimeOffReasons })(Reason);

//LIBRARIES
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import CheckBox from "react-native-check-box";

//ASSETS
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from "@Assets"
import styles from 'react-native-material-dropdown/src/components/dropdown/styles';


//====CLASS DECLARATION====//
class Reason extends React.Component {



  //--------->>>State Initilization----------->>>

  state = {
    FlatListData: [],
    selectedReasonId: '',
    selectedReason: '',
    otherText: '',
  };

  //------------>>>LifeCycle Methods------------->>>

  componentWillMount() {
    this.setState({ FlatListData: this.props.navigation.state.params.reasonTypes, selectedReasonId: this.props.navigation.state.params.selectedReasonId })
  }

  //------------->>>Controllers/Functions------------>>>>


  renderReason = ({ item, index }) => {
    //console.log(this.state.selectedReasonId, item.ResignationReasonID)
    return (
      <TouchableOpacity onPress={() => { this.setState({ selectedReasonId: item.ResignationReasonID, selectedReason: item.ReasonName }) }}>
        <View style={{ flex: 1, marginVertical: Matrics.CountScale(10), flexDirection: 'row', marginHorizontal: Matrics.CountScale(10) }}>
          <Text style={{ fontSize: Matrics.CountScale(16), flex: 1 }}>{item.ReasonName}</Text>
          <View style={{ justifyContent: 'flex-end', }}>
            <Image source={this.state.selectedReasonId == item.ResignationReasonID ? Images.checkMark : undefined} style={{ height: 10, width: 10, }} />
          </View>
        </View>
      </TouchableOpacity>

    )
  }

  //----------->>>Render Method-------------->>>
  render() {
    return (
      <View style={Styles.pageBody}>
        {/* ====>>>>>>>>>>> Header start <<<<<<<<<<==========> */}

        <View style={MasterCssEmployee.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
              //this.props.navigation.state.params.onSelect(this.state.selectedReasonId)
            }}
            style={MasterCssEmployee.headerTextContainerStyle}
          >
            <Text style={MasterCssEmployee.headerLeftTextStyle}>Cancel</Text>
          </TouchableOpacity>
          <View style={MasterCssEmployee.centerStyle}>
            <Text style={MasterCssEmployee.centerTextStyle}>Reason</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (this.state.selectedReasonId) {
                if(this.state.selectedReason === 'Other') {
                  if(this.state.otherText){
                    this.props.navigation.state.params.onSelect(this.state.selectedReasonId, this.state.selectedReason, this.state.otherText)
                    this.props.navigation.goBack();
                  } else {
                    alert('Please enter the reson')
                  }
                } else {
                  this.props.navigation.state.params.onSelect(this.state.selectedReasonId, this.state.selectedReason, this.state.otherText)
                  this.props.navigation.goBack();
                  // this.props.navigation.navigate('Signature');
                }
              }
              else
                alert('Please select reason type')
            }}
            style={MasterCssEmployee.headerTextContainerStyle}
          >
            <Text style={MasterCssEmployee.headerRightTextStyle}>Done</Text>
          </TouchableOpacity>
        </View>
        {/* ====>>>>>>>>>>> Header End <<<<<<<<<<==========> */}

        {this.renderPageContent()}
      </View>
    );
  }

  // ====>>>>>>>>>>> Page Content <<<<<<<<<<==========>
  renderPageContent() {
    return (
      <View style={{  }}>
        <FlatList
          data={this.state.FlatListData}
          renderItem={this.renderReason}
          // style={{ borderColor: 'red', borderWidth: 1,}}
          //contentContainerStyle={styles.FlatListStyle}
          ItemSeparatorComponent={() => <View style={{ borderWidth: 0.8, borderColor: Colors.LIGHTGREY }} />}
        />
        {
            (this.state.selectedReason === 'Other')
            ?
              (
                <View style={{  
                  borderBottomColor: Colors.DARK_GREY,
                  borderBottomWidth: 1, 
                  marginHorizontal: Matrics.CountScale(10),
                  marginVertical: Matrics.CountScale(10)
                }}>
                  <TextInput
                    style={styles.otherInputtext}
                    onChangeText={(text) => this.setState({otherText: text})}
                    value={this.state.otherText}
                    placeholder="Please enter reson" 
                  />
                </View>
              )
            : null
          }
      </View>
    );
  }
}

/* ====>>>>>>>>>>> Styles <<<<<<<<<<==========> */

const Styles = {
  pageBody: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  HeaderContainer: {
    resizeMode: 'contain',
    backgroundColor: 'white',
    height: Matrics.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Matrics.CountScale(15),
    paddingLeft: Matrics.CountScale(15),
    paddingRight: Matrics.CountScale(15),
  },
  intputContainer: {
    marginHorizontal: Matrics.CountScale(10),
    marginVertical: Matrics.CountScale(10),
    borderBottomColor: Colors.DARK_GREY,
    borderWidth: 1,
  },
  otherInputtext: {
    // marginHorizontal: Matrics.CountScale(10),
    // marginVertical: Matrics.CountScale(10),
    // borderBottomColor: Colors.DARK_GREY,
    // borderWidth: 1,
  },
  leftStyle: {
    justifyContent: 'center',
    flex: 0.5,
  },
  leftTextStyle: {

  },
  centerStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  centerTextStyle: {

  },
  rightStyle: {
    justifyContent: 'center',
    flex: 0.5
  },
  rightTextStyle: {

  },
  reasonContainer: {
    flex: 1,
    paddingTop: Matrics.CountScale(15),
    paddingBottom: Matrics.CountScale(15),
    flexDirection: 'row',
    marginLeft: Matrics.CountScale(10),
    marginRight: Matrics.CountScale(10),

  },
  reasonText: {
    justifyContent: 'center',
    fontSize: Matrics.CountScale(16),
    flex: 1,
    alignItems: 'flex-start'
  },


  borderView: {
    borderBottomColor: Colors.LIGHTGREY,
    borderBottomWidth: 0.8
  }
}






export default Reason;
