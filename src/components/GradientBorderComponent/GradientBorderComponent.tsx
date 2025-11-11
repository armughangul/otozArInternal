// GradientCornerBox.tsx
import React from "react";
import { View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Path,
  Line,
  Circle,
} from "react-native-svg";

type Props = {
  width: number;
  height: number;
  borderRadius?: number;
  borderWidth?: number;
  color?: string; // gradient color
  topLengthRatio?: number; // fraction of width used for top short stroke
  leftLengthRatio?: number; // fraction of height used for left short stroke
  glowRadius?: number | undefined; // override glow radius in px
  children?: React.ReactNode;
};

export default function GradientCornerBox({
  width,
  height,
  borderRadius = Math.round(Math.min(width, height) * 0.15), // auto nice radius
  borderWidth = Math.max(2, Math.round(Math.min(width, height) * 0.035)),
  color = "#58B8FF",
  topLengthRatio = 0.40,
  leftLengthRatio = 0.50,
  glowRadius,
  children,
}: Props) {
  // inset for drawing strokes so strokes don't get clipped
  const inset = borderWidth / 2;
  const x = inset;
  const y = inset;
  const w = Math.max(0, width - borderWidth);
  const h = Math.max(0, height - borderWidth);
  const r = Math.min(borderRadius, Math.min(w, h) / 2);

  // corner center for radial glow and arc math
  const cx = x + r;
  const cy = y + r;

  // how long the short top / left strokes should be (pixel values)
  const topLen = Math.max(24, Math.min(w * topLengthRatio, w * 0.6));
  const leftLen = Math.max(20, Math.min(h * leftLengthRatio, h * 0.7));

  const computedGlowR = glowRadius ?? Math.max(r * 1.8, Math.min(w, h) * 0.35);

  // quarter arc path (top-left corner of a rounded rect)
  const arcPath = `M ${cx} ${y} A ${r} ${r} 0 0 1 ${x} ${cy}`;

  // top stroke path and left stroke path (start from arc endpoints)
  const topPath = `M ${cx} ${y} L ${cx + topLen} ${y}`;
  const leftPath = `M ${x} ${cy} L ${x} ${cy + leftLen}`;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          {/* Top gradient (left -> right along top short stroke) */}
          <LinearGradient
            id="topGrad"
            x1={cx}
            y1={y}
            x2={cx + topLen}
            y2={y}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={color} stopOpacity="1" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>

          {/* Left gradient (top -> down along left short stroke) */}
          <LinearGradient
            id="leftGrad"
            x1={x}
            y1={cy}
            x2={x}
            y2={cy + leftLen}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={color} stopOpacity="1" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>

          {/* Arc gradient — subtle fade along the arc's span */}
          <LinearGradient
            id="arcGrad"
            // span across the corner area diagonally
            x1={cx - r * 0.9}
            y1={cy - r * 0.9}
            x2={cx + r * 0.7}
            y2={cy + r * 0.7}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={color} stopOpacity="0.98" />
            <Stop offset="0.45" stopColor={color} stopOpacity="0.45" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>

          {/* Radial glow behind corner for soft highlight */}
          <RadialGradient
            id="cornerGlow"
            cx={cx}
            cy={cy}
            r={computedGlowR}
            // use userSpaceOnUse so radius is in px
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={color} stopOpacity="0.55" />
            <Stop offset="0.35" stopColor={color} stopOpacity="0.18" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* White rounded rectangle background (no full border) */}
        <Rect x={x} y={y} width={w} height={h} rx={r} ry={r} fill="#fff" />

        {/* Soft corner glow behind everything */}
        <Circle cx={cx} cy={cy} r={computedGlowR} fill="url(#cornerGlow)" />

        {/* Short top stroke */}
        <Path
          d={topPath}
          stroke="url(#topGrad)"
          strokeWidth={borderWidth}
          strokeLinecap="round"
          fill="none"
        />

        {/* Short left stroke */}
        <Path
          d={leftPath}
          stroke="url(#leftGrad)"
          strokeWidth={borderWidth}
          strokeLinecap="round"
          fill="none"
        />

        {/* Quarter corner arc connecting top and left */}
        <Path
          d={arcPath}
          stroke="url(#arcGrad)"
          strokeWidth={Math.max(1, Math.round(borderWidth * 0.95))}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>

      {/* content container on top of SVG (so text sits above decorative corner) */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: r,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: Math.max(r * 0.6, 8),
          paddingTop: Math.max(r * 0.3, 6),
        }}
      >
        {children}
      </View>
    </View>
  );
}