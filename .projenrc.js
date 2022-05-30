const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'graphql-schema-merger',
  packageName: 'graphql-schema-merger',
  description: 'A simple helper to merge multiple graphql schemas with directives',
  authorName: 'Talha Siddiqui & Hassan Abbasi',
  authorOrganization: 'Maqsad',
  authorEmail: 'hassan@maqsad.io',
  authorUrl: 'maqsad.io',
  outdir: 'src/lib',


  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();