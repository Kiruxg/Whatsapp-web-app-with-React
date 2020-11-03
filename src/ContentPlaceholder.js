import React from "react"
import ContentLoader from "react-content-loader"

const RoomLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={476}
    height={83}
    viewBox="0 0 476 83"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="75" y="44" rx="1" ry="1" width="140" height="22" /> 
    <rect x="75" y="18" rx="1" ry="1" width="200" height="22" /> 
    <circle cx="40" cy="39" r="26" />
  </ContentLoader>
)

export default RoomLoader

