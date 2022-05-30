const { javascript } = require('projen');
const project = new javascript.NodeProject({
  defaultReleaseBranch: 'main',
  name: 'it-graphql-schema-merger',
  authorName: 'Talha Siddiqui & Hassan Abbasi',
  authorEmail: 'hassan@maqsad.io',
  authorOrganization: 'Maqsad IO',
  description: 'A simple tool for merging graphql schema files with directives!',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();