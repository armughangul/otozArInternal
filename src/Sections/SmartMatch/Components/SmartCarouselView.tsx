import * as React from "react";
import { Dimensions, View,TouchableWithoutFeedback } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
 
import SingleSmartItem from "./SingleSmartItem"; 
import { SmartMatchManagerType } from "../Manager/SmartMatchManager";
interface Props {
	manager : SmartMatchManagerType
}
const SmartCarouselView =(props : Props)=> {
	const PAGE_WIDTH = Dimensions.get("screen").width;
	const itemSize = PAGE_WIDTH - 110;
	const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;
	const animationStyle: TAnimationStyle = React.useCallback(
		(value: number) => {
			"worklet";
			const itemGap = interpolate(
				value,
				[-3, -2, -1, 0, 1, 2, 3],
				[-30, -15, 0, 0, 0, 15, 30],
			);
 
			const translateX =
				interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
				centerOffset -
				itemGap;
 
			const translateY = interpolate(
				value,
				[-1, -0.5, 0, 0.5, 1],
				[60, 45, 40, 45, 60],
			);
 
			const scale = interpolate(
				value,
				[-1, -0.5, 0, 0.5, 1],
				[0.8, 0.85, 1.1, 0.85, 0.8],
			);
 
			return {
				transform: [
					{
						translateX,
					},
					{
						translateY,
					},
					{ scale },
				],
			};
		},
		[centerOffset],
	);
 
	return (
		<View
			id="carousel-component"
			// dataSet={{ kind: "custom-animations", name: "circular" }}
		>
			<Carousel
				width={itemSize}
				height={500}
				style={{
					width: PAGE_WIDTH,
					height : 500
					// height: PAGE_WIDTH / 2,
				}}
				loop = {true}
				data={props.manager.list}
				onSnapToItem={(index)=>{
					props.manager.setCurentItem(index)
				}}
				renderItem={({ index,item }) => (
					<TouchableWithoutFeedback
						key={index}
						onPress={() => {
							console.log(index);
						}}
					>
						<View
						style = {{
							justifyContent : "center",
						}}
						>
						<SingleSmartItem
						car={item}
						/>
						</View>
					</TouchableWithoutFeedback>
				)}
				customAnimation={animationStyle}
			/>
		</View>
	);
}
 
export default SmartCarouselView;
 

