import styled from "@material-ui/core/styles/styled";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

export const ScreamCard = styled(Card)({
  display: "flex",
  marginBottom: 20,
  position: "relative"
});

export const ScreamCardContent = styled(CardContent)({
  padding: 25,
  objectFit: "cover"
});

export const ScreamCardMedia = styled(CardMedia)({
  minWidth: 200
});
