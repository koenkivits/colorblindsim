import { h } from "preact";
import { connect } from "unistore/preact";

import Daltonize from "../components/Daltonize";

const mapStateToProps = ({ daltonizer }) => ({
  ...daltonizer,
});

export default connect(mapStateToProps)(({ children, ...otherProps }) => (
  <Daltonize {...otherProps}>{children}</Daltonize>
));
