import { styled } from '../config/stitches.config';

const StatsCardStyled = styled("div", {
  border: "1px solid $gray300",
  borderRadius: "5px",
  width: "25%",
  height: "100px",
  margin: "4px",
  padding: "10px 16px",
  "h3": {
    fontWeight: "$bold",
    color: "$gray500",
    fontSize: "$7",
  },
  "p": {
    fontWeight: "$bold",
    fontSize: "$1",
    color: "$primary"
  },
  ".zero": {
    color: "$gray500"
  },
  "@md" : { width: "47%", },
})

export const StatsCard = ({stats}) => {
  return (
    <StatsCardStyled>
      <div>
        <h3>{stats.title}</h3>
        <p className={stats.count === 0 && "zero"}>{stats.count}</p>
      </div>
    </StatsCardStyled>
  )
}
