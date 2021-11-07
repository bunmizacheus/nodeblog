import Container from "@mui/material/Container";

import useStyles from "./Container.styles.js";

function ContainerWrapper({ children }) {
  const classes = useStyles();

  return (
    <Container fixed className={classes.container}>
      {children}
    </Container>
  );
}

export default ContainerWrapper;
