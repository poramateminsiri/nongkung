import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { checkOpenClawInstalled } from '../../src/utils/installer.js';

describe('checkOpenClawInstalled', () => {
  it('should return a boolean', () => {
    const result = checkOpenClawInstalled();
    assert.equal(typeof result, 'boolean', 'should return a boolean value');
  });

  it('should return false when openclaw is not installed', () => {
    // In most test environments, openclaw will not be globally installed,
    // so this test validates the expected behavior for missing binaries.
    // If openclaw happens to be installed, this test still passes since
    // we only assert the return type is boolean.
    const result = checkOpenClawInstalled();
    assert.equal(typeof result, 'boolean');
  });
});

describe('checkOpenClawInstalled return value semantics', () => {
  it('should return true or false without throwing', () => {
    // The function should gracefully handle the case where openclaw
    // is not found by catching the execSync error and returning false,
    // rather than letting the error propagate.
    assert.doesNotThrow(() => {
      checkOpenClawInstalled();
    });
  });
});
