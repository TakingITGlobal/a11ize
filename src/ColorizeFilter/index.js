import React from "react"

/**
 * SVG two-tone colour filter
 */
const ColorizeFilter = ({ id, dark, light = "#ffffff", wcagClamp = false }) => {
  // Convert color to linear RGB array from 0 to 1 in steps:
  const toArray = hexString =>
    // From hexadecimal string...
    hexString
      // ...to array of hex bytes
      .substring(1)
      .match(/.{2}/g)
      // ...to decimal
      .map(hex => Number.parseInt(hex, 16))
      .map(dec => dec / 255)
      // ...from sRGB to linear
      .map(rgb => ((rgb + 0.055) / 1.055) ** 2.4)
  // background/lows color
  let bg = toArray(dark)
  // foreground/highlight color
  const fg = toArray(light)

  // In feColorMatrix, each row is one new channel (RGBA).
  // For the five matrix columns `C1..C5` and the unfiltered pixel `rgba`
  // newChannel = r*C1 + g*C2 + b*C3 + a*C4 + C5

  // We greyscale first so we can use the red channel as "brightness"
  // following the implementation from the CSS Filter Effects standard
  // See https://www.w3.org/TR/filter-effects-1/#grayscaleEquivalent

  // Ensure WCAG compliance by clamping low values to 4.5 contrast ratio
  if (wcagClamp) {
    // relative luminance formula
    const lum = c => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
    const lBg = lum(bg)
    const lFg = lum(fg)
    // Noting that contrast ratio is (l1 + 0.05):(l2 + 0.05) and not just l1:l2,
    // we must consider the two cases of which is lighter:
    const l1 = Math.max(lBg, lFg) // lighter
    // case 1: foreground > background
    if (l1 === lFg) {
      const target = 4.5 * (lBg + 0.05) - 0.05
      const adjust = target / lFg
      bg = fg.map(c => c * adjust)
    }
    // case 2: background > foreground
    if (l1 === lBg) {
      const target = (lBg + 0.05) / 4.5 - 0.05
      const adjust = lBg / target
      bg = bg.map(c => c / adjust)
    }
  }

  // Forcing C5 to be the new color and alpha to be a*1 (unchanged),
  // all non-transparent pixels become the same color.
  // See https://css-tricks.com/color-filters-can-turn-your-gray-skies-blue/

  return (
    <filter id={id}>
      {wcagClamp && (
        <feColorMatrix
          type="matrix"
          values={`0.2126 0.7152 0.0722 0 0
                   0.2126 0.7152 0.0722 0 0
                   0.2126 0.7152 0.0722 0 0
                   0      0      0      1 0`}
        />
      )}
      <feColorMatrix
        type="matrix"
        values={`${fg[0] - bg[0]} 0 0 0 ${bg[0]}
                 ${fg[1] - bg[1]} 0 0 0 ${bg[1]}
                 ${fg[2] - bg[2]} 0 0 0 ${bg[2]}
                 0                0 0 1 0`}
      />
    </filter>
  )
}

export default ColorizeFilter