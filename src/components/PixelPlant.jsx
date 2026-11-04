function PixelPlant({ variant = "fern", className = "" }) {
  return (
    <svg
      className={`pixel-plant plant-${variant} ${className}`}
      viewBox="0 0 80 100"
      role="img"
      aria-label={`${variant} pixel-art potted plant`}
      shapeRendering="crispEdges"
    >
      {/* FERN: several narrow, branching leaves */}
      {variant === "fern" && (
        <g>
          <g className="plant-leaf leaf-left">
            <rect x="10" y="25" width="15" height="7" fill="#477c50" />
            <rect x="15" y="17" width="13" height="8" fill="#79a968" />
            <rect x="19" y="32" width="13" height="8" fill="#5c995e" />
            <rect x="25" y="40" width="9" height="8" fill="#396e49" />
          </g>

          <g className="plant-leaf leaf-centre">
            <rect x="33" y="5" width="13" height="9" fill="#8ab879" />
            <rect x="29" y="14" width="21" height="10" fill="#5c995e" />
            <rect x="34" y="24" width="13" height="15" fill="#477c50" />
          </g>

          <g className="plant-leaf leaf-right">
            <rect x="51" y="19" width="13" height="8" fill="#8ab879" />
            <rect x="55" y="27" width="15" height="8" fill="#5c995e" />
            <rect x="46" y="35" width="15" height="9" fill="#477c50" />
            <rect x="42" y="44" width="10" height="6" fill="#396e49" />
          </g>
        </g>
      )}

      {/* BROAD-LEAF: larger, distinctive blocky leaves */}
      {variant === "broad" && (
        <g>
          <g className="plant-leaf leaf-left">
            <rect x="9" y="27" width="17" height="15" fill="#477c50" />
            <rect x="14" y="20" width="19" height="9" fill="#79a968" />
            <rect x="18" y="42" width="18" height="8" fill="#5c995e" />
            <rect x="27" y="35" width="8" height="9" fill="#396e49" />
          </g>

          <g className="plant-leaf leaf-centre">
            <rect x="31" y="5" width="17" height="13" fill="#8ab879" />
            <rect x="26" y="17" width="28" height="17" fill="#5c995e" />
            <rect x="33" y="34" width="16" height="14" fill="#477c50" />
            <rect x="37" y="12" width="5" height="29" fill="#a8c77e" />
          </g>

          <g className="plant-leaf leaf-right">
            <rect x="52" y="25" width="17" height="14" fill="#6b9f59" />
            <rect x="47" y="18" width="18" height="9" fill="#8ab879" />
            <rect x="45" y="39" width="18" height="10" fill="#477c50" />
            <rect x="43" y="32" width="8" height="9" fill="#396e49" />
          </g>
        </g>
      )}

      {/* FLOWER: upright leaves and a pixel flower */}
      {variant === "flower" && (
        <g>
          <g className="plant-leaf leaf-left">
            <rect x="12" y="37" width="16" height="8" fill="#5c995e" />
            <rect x="18" y="29" width="15" height="8" fill="#79a968" />
            <rect x="25" y="37" width="9" height="10" fill="#477c50" />
          </g>

          <g className="plant-leaf leaf-right">
            <rect x="49" y="35" width="17" height="9" fill="#5c995e" />
            <rect x="47" y="27" width="15" height="8" fill="#79a968" />
            <rect x="43" y="37" width="10" height="10" fill="#477c50" />
          </g>

          <g className="plant-leaf leaf-centre">
            <rect x="34" y="5" width="12" height="10" fill="#e9b5a0" />
            <rect x="25" y="14" width="12" height="10" fill="#d98e87" />
            <rect x="43" y="14" width="12" height="10" fill="#d98e87" />
            <rect x="34" y="23" width="12" height="10" fill="#e9b5a0" />
            <rect x="34" y="14" width="12" height="10" fill="#e8c77e" />
          </g>
        </g>
      )}

      {/* TRAILING: cascading leaves */}
      {variant === "trailing" && (
        <g>
          <g className="plant-leaf leaf-left">
            <rect x="9" y="16" width="13" height="9" fill="#79a968" />
            <rect x="14" y="25" width="14" height="9" fill="#5c995e" />
            <rect x="21" y="34" width="12" height="9" fill="#477c50" />
            <rect x="27" y="43" width="9" height="8" fill="#396e49" />
          </g>

          <g className="plant-leaf leaf-centre">
            <rect x="34" y="7" width="12" height="10" fill="#8ab879" />
            <rect x="30" y="17" width="20" height="10" fill="#5c995e" />
            <rect x="35" y="27" width="12" height="13" fill="#477c50" />
          </g>

          <g className="plant-leaf leaf-right">
            <rect x="54" y="18" width="13" height="9" fill="#79a968" />
            <rect x="49" y="27" width="15" height="9" fill="#5c995e" />
            <rect x="46" y="36" width="12" height="9" fill="#477c50" />
            <rect x="43" y="45" width="9" height="8" fill="#396e49" />
          </g>
        </g>
      )}

      {/* Stems */}
      <g className="plant-stems">
        <rect x="37" y="37" width="6" height="28" fill="#8d9c54" />
      </g>

      {/* Pot */}
      <rect x="20" y="63" width="40" height="7" fill="#e0a56f" />
      <rect x="24" y="70" width="32" height="17" fill="#b9684f" />
      <rect x="29" y="87" width="22" height="5" fill="#8e4e3f" />

      {/* Pot highlights */}
      <rect x="27" y="73" width="5" height="10" fill="#d48a65" />
      <rect x="36" y="70" width="8" height="3" fill="#e6b184" />
    </svg>
  );
}

export default PixelPlant;