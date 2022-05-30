import * as fs from 'fs';
import * as path from 'path';
import { GraphQLSchemaStitcher } from '../src/index';


const helper = new GraphQLSchemaStitcher({
  inputDir: __dirname + '/mock/input',
});
test('Functions Defined', () => {
  expect(helper.mergeSchemaContents).toBeDefined();
  expect(helper.fixDirectives).toBeDefined();
  expect(helper.stitch).toBeDefined();

});

test('Schema Files Contents Merged', () => {
  const sampleSchema = __dirname + '/mock/simple.merge.graphql';

  let output = helper.mergeSchemaContents();

  output = removeSpace(output);
  const sample = removeSpace(fs.readFileSync(sampleSchema).toString());
  expect(sample).toBe(output);


});


test('Schema Directives Corrected', () => {
  const sampleSchema = __dirname + '/mock/final.merge.graphql';

  let output = helper.mergeSchemaContents();
  output = helper.fixDirectives(output);

  output = removeSpace(output);
  const sample = removeSpace(fs.readFileSync(sampleSchema).toString());
  expect(sample).toBe(output);
});

test('E2E Test', () => {
  const sampleSchema = __dirname + '/mock/final.merge.graphql';
  const outputSchema = path.join(__dirname, 'merged.graphql');
  helper.stitch(outputSchema);

  const sample = removeSpace(fs.readFileSync(sampleSchema).toString());
  const output = removeSpace(fs.readFileSync(outputSchema).toString());
  expect(sample).toBe(output);
});

function removeSpace(input: string): string {
  return input.replace(/\s/g, '');
}

//
// function findDifferenceBetweenFiles(fileA: string, fileB: string): boolean {
//   const fileAContents = fs.readFileSync(fileA).toString();
//   const fileBContents = fs.readFileSync(fileB).toString();
//
//   return fileAContents.replace(/\s/g, '') == fileBContents.replace(/\s/g, '');
// }
//
