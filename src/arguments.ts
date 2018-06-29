import * as commandLineArgs from 'command-line-args';

const optionDefinitions = [
  { name: 'parent-node', alias: 'p', type: String },
  { name: 'rcp', type: Boolean },
  { name: 'rcp-port', type: Number },
  { name: 'rcp-host', type: String },
  { name: 'rcp-origins', type: String, multiple: true, },
  { name: 'ws', type: Boolean },
  { name: 'ws-port', type: Number },
  { name: 'ws-host', type: String },
  { name: 'ws-origins', type: String, multiple: true, },
  { name: 'mine', type: Boolean, alias: 'm' },
];

const options = commandLineArgs(optionDefinitions);

export default options;
