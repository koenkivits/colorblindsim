import { h } from "preact";
import { connect } from "unistore/preact";

import Application from "../components/Application";
import { toggleDisabled, setAnomaly } from "../actions";

const mapStateToProps = ({ daltonizer }) => ({
  daltonizer,
});
const actions = { toggleDisabled, setAnomaly };

export default connect(mapStateToProps, actions)(Application);
