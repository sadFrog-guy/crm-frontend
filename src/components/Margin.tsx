interface MarginProps {
    direction: "t" | "b" | "l" | "r",
    value: number
}

interface styleObjectTypes {
  marginTop?: string,
  marginBottom?: string,
  marginLeft?: string,
  marginRight?: string,
}

export default function Margin({direction, value}: MarginProps) {
  function generateStyles() {
    let styleObject: styleObjectTypes = {}

    switch (direction) {
      case "t":
        styleObject.marginTop = `${value}px`
        break
      case "b":
        styleObject.marginBottom = `${value}px`
        break
      case "l":
        styleObject.marginLeft = `${value}px`
        break
      case "r":
        styleObject.marginRight = `${value}px`
        break
    }

    return styleObject
  }

  return (
    <div style={generateStyles()}/>
  )
}
