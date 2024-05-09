import { Dimensions } from 'react-native';



const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')



const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (deviceWidth / guidelineBaseWidth) * size;
const verticalScale = (size) => (deviceHeight / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

export const wp = (percetage)=>{
    const width = deviceWidth;
    return (percetage*width)/100;
}

export const hp = (percetage)=>{
    const height = deviceHeight;
    return (percetage*height)/100;
}