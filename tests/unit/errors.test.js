// tests/unit/errors.test.js — Unit tests for lib/errors.js
import { describe, it, expect } from 'vitest';
import { Result, ErrorCode, tryCatch, tryReadJson } from '../../.claude/councilorg/lib/errors.js';

describe('ErrorCode', () => {
  it('defines standard error codes', () => {
    expect(ErrorCode.NOT_FOUND).toBe('NOT_FOUND');
    expect(ErrorCode.VALIDATION).toBe('VALIDATION_ERROR');
    expect(ErrorCode.PARSE).toBe('PARSE_ERROR');
    expect(ErrorCode.IO).toBe('IO_ERROR');
    expect(ErrorCode.STATE).toBe('STATE_ERROR');
    expect(ErrorCode.UNKNOWN).toBe('UNKNOWN_ERROR');
  });
});

describe('Result', () => {
  it('creates successful result with ok()', () => {
    const r = Result.ok(42);
    expect(r.isOk).toBe(true);
    expect(r.isFail).toBe(false);
    expect(r.value).toBe(42);
    expect(r.error).toBeNull();
  });

  it('creates failed result with fail()', () => {
    const err = new Error('test error');
    const r = Result.fail(err);
    expect(r.isOk).toBe(false);
    expect(r.isFail).toBe(true);
    expect(r.error).toBe(err);
    expect(r.value).toBeNull();
  });

  it('failWithCode() sets error code', () => {
    const r = Result.failWithCode(ErrorCode.NOT_FOUND, 'Role not found');
    expect(r.isFail).toBe(true);
    expect(r.error).toBe('Role not found');
    expect(r.code).toBe('NOT_FOUND');
    expect(r.hasCode(ErrorCode.NOT_FOUND)).toBe(true);
    expect(r.hasCode(ErrorCode.VALIDATION)).toBe(false);
  });

  it('ok() has no error code', () => {
    const r = Result.ok('data');
    expect(r.code).toBeUndefined();
    expect(r.hasCode(ErrorCode.NOT_FOUND)).toBe(false);
  });

  it('unwrap() returns value on ok', () => {
    const r = Result.ok('hello');
    expect(r.unwrap()).toBe('hello');
  });

  it('unwrap() throws on fail', () => {
    const r = Result.fail(new Error('boom'));
    expect(() => r.unwrap()).toThrow('boom');
  });

  it('unwrapOr() returns value on ok', () => {
    const r = Result.ok(10);
    expect(r.unwrapOr(99)).toBe(10);
  });

  it('unwrapOr() returns fallback on fail', () => {
    const r = Result.fail(new Error('fail'));
    expect(r.unwrapOr(99)).toBe(99);
  });
});

describe('tryCatch()', () => {
  it('returns ok for successful function', () => {
    const r = tryCatch(() => 42);
    expect(r.isOk).toBe(true);
    expect(r.value).toBe(42);
  });

  it('returns fail for throwing function', () => {
    const r = tryCatch(() => { throw new Error('boom'); });
    expect(r.isFail).toBe(true);
    expect(r.error.message).toBe('boom');
  });

  it('wraps non-Error throws in Error', () => {
    const r = tryCatch(() => { throw 'string error'; });
    expect(r.isFail).toBe(true);
    expect(r.error).toBeInstanceOf(Error);
  });
});

describe('tryReadJson()', () => {
  it('returns parsed JSON for valid input', () => {
    const mockReadFile = (_path, _enc) => '{"key": "value"}';
    const r = tryReadJson(mockReadFile, 'test.json');
    expect(r.isOk).toBe(true);
    expect(r.value.key).toBe('value');
  });

  it('returns fail for invalid JSON', () => {
    const mockReadFile = (_path, _enc) => '{invalid json}';
    const r = tryReadJson(mockReadFile, 'test.json');
    expect(r.isFail).toBe(true);
  });

  it('returns fail for read error', () => {
    const mockReadFile = (_path, _enc) => { throw new Error('ENOENT'); };
    const r = tryReadJson(mockReadFile, 'missing.json');
    expect(r.isFail).toBe(true);
    expect(r.error.message).toBe('ENOENT');
  });
});
