import { h } from "preact";
import { connect } from "unistore/preact";

import Application from "../components/Application";
import { toggleDisabled } from "../actions";

const mapStateToProps = ({ daltonizer }) => ({
  daltonizer,
});
const actions = { toggleDisabled };

export default connect(mapStateToProps, actions)(Application);
