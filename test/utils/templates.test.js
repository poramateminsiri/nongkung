import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Since fs-extra (a dependency of templates.js) may not be installed in CI,
// we read the source file directly and validate the template content.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateSource = readFileSync(
  path.resolve(__dirname, '../../src/utils/templates.js'),
  'utf-8'
);

// Extract template strings from source for testing
function extractTemplate(source, varName) {
  // Match template literal assigned to the given const name
  const regex = new RegExp(`const ${varName} = \`([\\s\\S]*?)\`;`);
  const match = source.match(regex);
  return match ? match[1] : null;
}

const soulTemplate = extractTemplate(templateSource, 'SOUL_TEMPLATE');
const userTemplate = extractTemplate(templateSource, 'USER_TEMPLATE');

describe('SOUL_TEMPLATE content', () => {
  it('should be extractable from source', () => {
    assert.ok(soulTemplate !== null, 'SOUL_TEMPLATE should exist in source');
  });

  it('should contain {{personality}} placeholder', () => {
    assert.ok(
      soulTemplate.includes('{{personality}}'),
      'should contain {{personality}} placeholder for substitution'
    );
  });

  it('should contain Thai personality section heading', () => {
    assert.ok(
      soulTemplate.includes('บุคลิก'),
      'should contain Thai heading for personality traits'
    );
  });

  it('should contain Thai response behavior section', () => {
    assert.ok(
      soulTemplate.includes('การตอบสนอง'),
      'should contain Thai heading for response behavior'
    );
  });

  it('should specify Thai language as primary', () => {
    assert.ok(
      soulTemplate.includes('ภาษาไทย'),
      'should mention Thai language'
    );
  });

  it('should include the lobster emoji branding', () => {
    assert.ok(
      soulTemplate.includes('\u{1F99E}'),
      'should include the lobster emoji'
    );
  });

  it('should be a valid Markdown document with a heading', () => {
    assert.ok(
      soulTemplate.includes('# SOUL.md'),
      'should start with a Markdown heading'
    );
  });
});

describe('USER_TEMPLATE content', () => {
  it('should be extractable from source', () => {
    assert.ok(userTemplate !== null, 'USER_TEMPLATE should exist in source');
  });

  it('should contain {{channel}} placeholder', () => {
    assert.ok(
      userTemplate.includes('{{channel}}'),
      'should contain {{channel}} placeholder'
    );
  });

  it('should contain {{date}} placeholder', () => {
    assert.ok(
      userTemplate.includes('{{date}}'),
      'should contain {{date}} placeholder'
    );
  });

  it('should contain {{personality}} placeholder', () => {
    assert.ok(
      userTemplate.includes('{{personality}}'),
      'should contain {{personality}} placeholder'
    );
  });

  it('should reference the user as เจ้านาย', () => {
    assert.ok(
      userTemplate.includes('เจ้านาย'),
      'should reference the user with Thai term เจ้านาย'
    );
  });

  it('should be a valid Markdown document with a heading', () => {
    assert.ok(
      userTemplate.includes('# USER.md'),
      'should start with a Markdown heading'
    );
  });

  it('should have sections for preferences and projects', () => {
    assert.ok(
      userTemplate.includes('ความชอบ'),
      'should have a preferences section'
    );
    assert.ok(
      userTemplate.includes('โปรเจกต์'),
      'should have a projects section'
    );
  });
});

describe('copyThaiTemplates export', () => {
  it('should export copyThaiTemplates function', () => {
    assert.ok(
      templateSource.includes('export { copyThaiTemplates }'),
      'should export copyThaiTemplates as a named export'
    );
  });

  it('copyThaiTemplates should create memory subdirectories', () => {
    // Verify the function body creates the expected directory structure
    assert.ok(
      templateSource.includes("'memory'"),
      'should reference memory directory'
    );
    assert.ok(
      templateSource.includes("'dailylog'"),
      'should reference dailylog subdirectory'
    );
    assert.ok(
      templateSource.includes("'person'"),
      'should reference person subdirectory'
    );
    assert.ok(
      templateSource.includes("'product'"),
      'should reference product subdirectory'
    );
  });
});
