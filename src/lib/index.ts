import * as fs from 'fs';
import path from 'path';

export interface SchemaStitcherProps {
  inputDir: string;
}

export class GraphQLSchemaStitcher {
  private readonly schemaInputFolder: string;

  constructor(props: SchemaStitcherProps) {
    this.schemaInputFolder = props.inputDir;
  }


  stitch(outputFile: string) {
    console.log(this.schemaInputFolder);
    console.log(outputFile);
    let merged = this.mergeSchemaContents();
    merged = this.fixDirectives(merged);
    this.saveToFile(merged, outputFile);
  }


  private saveToFile(contents: string, outputFile: string) {
    fs.writeFileSync(outputFile, contents);
  }

  mergeSchemaContents(): string {

    const files = fs.readdirSync(this.schemaInputFolder).sort((a, b) => (a < b ? 1 : -1));
    let outputData = '';
    files.forEach(file => {
      const fileData = fs.readFileSync(path.join(this.schemaInputFolder, file)).toString();
      outputData += fileData + '\n';
    });
    return outputData;
  }

  private mergeDirective(directive: string, data: string): string {
    let outputData = data;
    const regex_str = `type ${directive} ?{([^}]*)}`;
    const regex = new RegExp(regex_str, 'g');

    let directiveStr = `\n\ntype ${directive} {\n`;

    let match: any;

    while (match = regex.exec(outputData)) {
      outputData = outputData.replace(match[0], '').trim();
      directiveStr = directiveStr + match[1] + '\n';
    }
    directiveStr = directiveStr + '}\n';
    outputData = outputData.replace(/^\s*\n/gm, '\n');
    outputData = outputData + directiveStr;
    return outputData;
  }

  fixDirectives(contents: string): string {
    let outputData = contents;
    const schemaDirectives = ['Query', 'Mutation', 'Subscription'];
    schemaDirectives.forEach(directive => outputData = this.mergeDirective(directive, outputData));
    return outputData;
  }
}

